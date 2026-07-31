import { spawn } from "node:child_process";
import { mkdirSync } from "node:fs";

const CHROME = process.env.CHROME || "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const PORT = 9333;
const BASE = process.env.BASE_URL || "http://localhost:3000";
const OUT = process.env.OUT_DIR || "C:\\Users\\BAZIE JOSIAS\\AppData\\Local\\Temp\\opencode\\shots";

const viewports = [
  { w: 390, h: 844, name: "iphone-390" },
  { w: 360, h: 740, name: "galaxy-360" },
  { w: 320, h: 568, name: "small-320" },
];
const paths = ["/", "/blog"];

mkdirSync(OUT, { recursive: true });

const chrome = spawn(
  CHROME,
  [
    "--headless=new",
    `--remote-debugging-port=${PORT}`,
    "--no-first-run",
    "--disable-gpu",
    "--no-sandbox",
    "about:blank",
  ],
  { stdio: "ignore" }
);

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function getPageWs() {
  for (let i = 0; i < 40; i++) {
    try {
      const list = await fetch(`http://127.0.0.1:${PORT}/json/list`).then((r) => r.json());
      const page = list.find((t) => t.type === "page");
      if (page) return page.webSocketDebuggerUrl;
    } catch {}
    await sleep(250);
  }
  throw new Error("Chrome debugging port not reachable");
}

const ws = new WebSocket(await getPageWs());
let id = 0;
const pending = new Map();

ws.onmessage = (event) => {
  const msg = JSON.parse(event.data);
  if (msg.id && pending.has(msg.id)) {
    pending.get(msg.id)(msg);
    pending.delete(msg.id);
  }
};

function send(method, params = {}) {
  return new Promise((resolve) => {
    const msgId = ++id;
    pending.set(msgId, resolve);
    ws.send(JSON.stringify({ id: msgId, method, params }));
  });
}

await new Promise((r) => ws.addEventListener("open", r));
await send("Page.enable");

const measure = `(() => {
  const vw = document.documentElement.clientWidth;
  const vh = document.documentElement.clientHeight;
  const offenders = [];
  for (const el of document.querySelectorAll("*")) {
    const r = el.getBoundingClientRect();
    if (r.right > vw + 1 || r.left < -1) {
      offenders.push({
        tag: el.tagName.toLowerCase(),
        cls: String(el.className || "").slice(0, 90),
        left: Math.round(r.left),
        right: Math.round(r.right),
        width: Math.round(r.width),
      });
    }
  }
  return JSON.stringify({ vw, vh, offenders: offenders.slice(0, 25), total: offenders.length });
})()`;

for (const { w, h, name } of viewports) {
  await send("Emulation.setDeviceMetricsOverride", {
    width: w,
    height: h,
    deviceScaleFactor: 1,
    mobile: true,
  });
  for (const p of paths) {
    await send("Page.navigate", { url: BASE + p });
    await sleep(3000);
    const res = await send("Runtime.evaluate", { expression: measure, returnByValue: true });
    const data = JSON.parse(res.result.result.value);
    const status = data.total === 0 ? "OK" : `OVERFLOW x${data.total}`;
    console.log(`[${name}] ${p} vw=${data.vw} -> ${status}`);
    for (const o of data.offenders.slice(0, 12)) {
      console.log(`    - <${o.tag}> ${o.cls || "(no class)"} [${o.left}, ${o.right}] w=${o.width}`);
    }
    const shot = await send("Page.captureScreenshot", { format: "png" });
    const { writeFileSync } = await import("node:fs");
    const b64 = shot.result?.data;
    if (b64) {
      writeFileSync(`${OUT}/${name}${p === "/" ? "" : "-blog"}.png`, Buffer.from(b64, "base64"));
    } else {
      console.log("    ! screenshot failed");
    }

    if (p === "/" && w <= 390) {
      await send("Runtime.evaluate", {
        expression: `document.querySelector('button[aria-label="Ouvrir le menu"]')?.click()`,
      });
      await sleep(1600);
      const menuRes = await send("Runtime.evaluate", {
        expression: measure,
        returnByValue: true,
      });
      const menuData = JSON.parse(menuRes.result.result.value);
      const menuStatus = menuData.total === 0 ? "OK" : `OVERFLOW x${menuData.total}`;
      console.log(`[${name}] / (menu ouvert) -> ${menuStatus}`);
      for (const o of menuData.offenders.slice(0, 10)) {
        console.log(`    - <${o.tag}> ${o.cls || "(no class)"} [${o.left}, ${o.right}] w=${o.width}`);
      }
    }
  }
}

ws.close();
chrome.kill();
console.log("DONE");
process.exit(0);
