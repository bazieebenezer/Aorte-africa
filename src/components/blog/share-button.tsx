"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Share2 } from "lucide-react";

export function ShareButton() {
  const [copied, setCopied] = useState(false);

  const onShare = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      toast.success("Lien copié", {
        description: "Partagez cet article où vous voulez.",
      });
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error("Impossible de copier le lien");
    }
  };

  return (
    <button
      onClick={onShare}
      aria-label="Partager l'article"
      className="flex items-center gap-2 text-sm text-muted-foreground transition-colors duration-200 hover:text-foreground"
    >
      <Share2 className="size-4" />
      {copied ? "Lien copié" : "Partager"}
    </button>
  );
}
