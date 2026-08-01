"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { label: "Accueil", href: "/#home" },
  { label: "Formation", href: "/#learn" },
  { label: "Solutions", href: "/#solves" },
  { label: "Boutique", href: "/#market" },
  { label: "Vision", href: "/#dream" },
  { label: "Blog", href: "/blog" },
];

export function Navbar({ onContact }: { onContact: () => void }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const close = () => setOpen(false);

  return (
    <motion.header
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1, ease: "easeOut" }}
      className="fixed inset-x-0 top-0 z-50"
    >
      <nav
        className={cn(
          "mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 transition-colors duration-300 sm:px-6 lg:px-8",
          open
            ? "bg-transparent"
            : "border-b border-border/60 bg-background/60 backdrop-blur-xl"
        )}
      >
        <Link href="/#home" className="relative z-[70] flex items-center" onClick={close}>
          <Image
            src="/img/logo.svg"
            alt="Aorte logo"
            width={28}
            height={28}
            className="h-7 w-auto"
            priority
          />
        </Link>

        <ul className="hidden items-center gap-6 lg:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="group relative text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 h-px w-0 bg-primary transition-all duration-300 group-hover:w-full" />
              </Link>
            </li>
          ))}
        </ul>

        <div className="hidden lg:block">
          <Button onClick={onContact} size="sm">
            Contact
          </Button>
        </div>

        <button
          onClick={() => setOpen(!open)}
          aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
          className={cn(
            "relative z-[70] flex size-10 items-center justify-center rounded-md border transition-colors lg:hidden",
            open
              ? "border-primary/60 bg-primary/10 text-primary"
              : "border-border text-muted-foreground hover:text-foreground"
          )}
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, clipPath: "circle(0% at calc(100% - 48px) 48px)" }}
            animate={{ opacity: 1, clipPath: "circle(150% at calc(100% - 48px) 48px)" }}
            exit={{ opacity: 0, clipPath: "circle(0% at calc(100% - 48px) 48px)" }}
            transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
            className="fixed inset-0 z-[60] flex flex-col overflow-hidden bg-background/95 backdrop-blur-2xl lg:hidden"
            style={{
              backgroundImage: "url(/img/grid.svg)",
              backgroundSize: "contain",
              backgroundRepeat: "repeat",
            }}
          >
            <div
              aria-hidden
              className="pointer-events-none absolute -top-24 left-1/2 size-[clamp(300px,60vw,500px)] -translate-x-1/2 rounded-full bg-primary/10 blur-[120px]"
            />

            <nav className="relative z-10 flex flex-1 flex-col items-center justify-center gap-1 px-6">
              {NAV_LINKS.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: 60, filter: "blur(8px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: 40, filter: "blur(8px)" }}
                  transition={{
                    duration: 0.6,
                    delay: 0.15 + i * 0.08,
                    ease: "backOut",
                  }}
                  className="w-full max-w-md"
                >
                  <Link
                    href={link.href}
                    onClick={close}
                    className="group flex items-center gap-4 py-2 sm:py-3"
                  >
                    <span className="flex items-center gap-3 text-[clamp(2rem,9vw,3rem)] font-semibold tracking-tight transition-transform duration-300 group-hover:translate-x-3">
                      <span className="text-silver">{link.label}</span>
                      <ArrowUpRight className="size-6 opacity-0 transition-all duration-300 group-hover:opacity-100 sm:size-8" />
                    </span>
                  </Link>
                </motion.div>
              ))}

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: 0.7, ease: "backOut" }}
                className="mt-10 w-full max-w-md"
              >
                <Button
                  onClick={() => {
                    close();
                    onContact();
                  }}
                  size="lg"
                  className="w-full font-semibold"
                >
                  Contact
                </Button>
              </motion.div>
            </nav>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, delay: 0.9 }}
              className="relative z-10 pb-10 text-center text-xs text-muted-foreground"
            >
              Graduatim, Potens. — Aorte
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
