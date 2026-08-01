import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";

const NAVIGATION = [
  { label: "Learn", href: "/#learn" },
  { label: "System", href: "/#solves" },
  { label: "Eco-Store", href: "/#market" },
  { label: "Vision", href: "/#dream" },
  { label: "Blog", href: "/blog" },
];

const PRESENCE = [
  { label: "LinkedIn", href: "https://www.linkedin.com/company/aorte-africa/" },
];

export function Footer() {
  return (
    <footer className="border-t border-border/60 px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-6xl flex-col gap-10 md:flex-row md:justify-between">
        <div>
          <div className="flex items-center gap-3">
            <Image
              src="/img/logo.svg"
              alt="Logo Aorte Group"
              width={28}
              height={28}
              className="h-7 w-auto"
            />
            <p className="text-sm text-muted-foreground">Graduatim, Potens.</p>
          </div>
        </div>

        <div className="flex flex-wrap gap-12">
          <div>
            <h5 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Navigation
            </h5>
            <ul className="mt-5 space-y-3">
              {NAVIGATION.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h5 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Contact
            </h5>
            <div className="mt-5 space-y-2 text-sm text-muted-foreground">
              <p>Ouagadougou, Secteur 24</p>
              <p>Burkina Faso</p>
              <a
                href="mailto:aorte-group@outlook.com"
                className="block transition-colors hover:text-foreground"
              >
                aorte-group@outlook.com
              </a>
            </div>
            <Badge
              variant="outline"
              className="mt-4 rounded-full border-border text-xs font-medium text-muted-foreground"
            >
              Disponible à tout instant
            </Badge>
          </div>

          <div>
            <h5 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Présence
            </h5>
            <ul className="mt-5 space-y-3">
              {PRESENCE.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    target={item.href.startsWith("http") ? "_blank" : undefined}
                    rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="mx-auto mt-16 max-w-6xl border-t border-border/60 pt-6 text-center">
        <p className="text-sm text-muted-foreground">
          © 2026 Aorte Group. Tous droits réservés.
        </p>
      </div>
    </footer>
  );
}
