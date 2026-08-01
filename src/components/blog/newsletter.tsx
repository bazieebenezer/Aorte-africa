"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function Newsletter() {
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setEmail("");
      toast.success("Inscription confirmée", {
        description: "Vous recevrez nos prochains articles.",
      });
    }, 600);
  };

  return (
    <section className="mx-auto mt-20 w-full max-w-6xl px-4 sm:px-6">
      <div className="rounded-2xl border border-border bg-card p-8 sm:p-12">
        <div className="mx-auto max-w-xl text-center">
          <h2 className="text-silver fs-card-title font-semibold">
            La newsletter d&apos;Aorte
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            Un article de fond par semaine sur la tech, le design et l&apos;ingénierie.
            Sans spam, désinscription en un clic.
          </p>
          <form onSubmit={onSubmit} className="mt-6 flex flex-col gap-3 sm:flex-row">
            <Input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="votre@email.com"
              aria-label="Votre adresse email"
              className="h-14 flex-1 text-base sm:h-16"
            />
            <Button
              type="submit"
              disabled={submitting}
              className="h-14 px-8 text-base sm:h-16"
            >
              {submitting ? "Envoi..." : "S'abonner"}
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
}
