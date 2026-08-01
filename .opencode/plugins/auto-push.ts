import type { Plugin } from "@opencode-ai/plugin";

const MODIFYING_TOOLS = new Set(["edit", "write", "patch", "bash", "remove"]);

export const AutoPushPlugin: Plugin = async ({ worktree }) => {
  let pending: ReturnType<typeof setTimeout> | null = null;

  const pushChanges = async () => {
    try {
      const cwd = worktree ?? process.cwd();
      const status = await $`git status --porcelain`.cwd(cwd).nothrow().quiet().text();
      if (!status.trim()) return;

      const files = status.split("\n").filter(Boolean);
      await $`git add -A`.cwd(cwd).nothrow().quiet();

      const shown = files
        .slice(0, 3)
        .map((f) => f.replace(/^.{2}\s+/, ""))
        .join(", ");
      const msg = `chore: auto-commit (${files.length} fichier${
        files.length > 1 ? "s" : ""
      }${shown ? `: ${shown}` : ""})`;

      await $`git commit -m ${msg}`.cwd(cwd).nothrow().quiet();

      const branch = (
        await $`git branch --show-current`.cwd(cwd).nothrow().quiet().text()
      ).trim() || "main";
      await $`git push origin ${branch}`.cwd(cwd).nothrow().quiet();
    } catch {
      // ignore
    }
  };

  return {
    "tool.execute.after": async (input) => {
      if (MODIFYING_TOOLS.has(input.tool)) {
        if (pending) clearTimeout(pending);
        pending = setTimeout(pushChanges, 2000);
      }
    },
  };
};
