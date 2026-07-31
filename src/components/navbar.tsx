"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
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

  const close = () => setOpen(false);

  return (
    <motion.header
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1, ease: "easeOut" }}
      className="fixed inset-x-0 top-0 z-50 border-b border-border/60 bg-background/60 backdrop-blur-xl"
    >
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Link href="/#home" className="flex items-center" onClick={close}>
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
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                {link.label}
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
          aria-label="Menu"
          className="flex size-10 items-center justify-center rounded-md border border-border text-muted-foreground transition-colors hover:text-foreground lg:hidden"
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
            className={cn(
              "absolute inset-x-4 top-[72px] mx-auto max-w-md",
              "rounded-lg border border-border bg-background/80 p-6 backdrop-blur-2xl",
              "flex flex-col items-center gap-6 lg:hidden"
            )}
          >
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={close}
                className="text-sm font-medium text-foreground"
              >
                {link.label}
              </Link>
            ))}
            <Button
              onClick={() => {
                close();
                onContact();
              }}
              className="w-full"
            >
              Contact
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
