"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export function ContactDialog({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const [submitting, setSubmitting] = useState(false);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      onOpenChange(false);
      toast.success("Message envoyé", {
        description: "Notre équipe vous répondra dans les plus brefs délais.",
      });
    }, 600);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[560px]">
        <DialogHeader className="text-left">
          <DialogTitle className="text-2xl">Contactez-nous.</DialogTitle>
          <DialogDescription>
            Notre équipe vous répondra dans les plus brefs délais.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={onSubmit} className="flex flex-col gap-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <Label htmlFor="lastname">Nom *</Label>
              <Input id="lastname" placeholder="Kaboré" required />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="firstname">Prénom *</Label>
              <Input id="firstname" placeholder="Donald" required />
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <Label htmlFor="email">Email *</Label>
              <Input id="email" type="email" placeholder="exemple@mail.com" required />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="company">Entreprise (optionnel)</Label>
              <Input id="company" placeholder="Aorte Group" />
            </div>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="message">Votre message *</Label>
            <Textarea id="message" placeholder="Décrivez votre besoin..." rows={5} required />
          </div>

          <Button type="submit" disabled={submitting} className="self-center">
            <Send className="size-4" />
            {submitting ? "Envoi..." : "Envoyer le message"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
