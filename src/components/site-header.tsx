"use client";

import { useState } from "react";
import { Navbar } from "@/components/navbar";
import { ContactDialog } from "@/components/contact-dialog";

export function SiteHeader() {
  const [contactOpen, setContactOpen] = useState(false);

  return (
    <>
      <Navbar onContact={() => setContactOpen(true)} />
      <ContactDialog open={contactOpen} onOpenChange={setContactOpen} />
    </>
  );
}
