/** Primary navigation links — single source of truth for nav + footer. */
export interface NavLink {
  label: string;
  href: string;
  /** Mono index shown in the mobile drawer. */
  index: string;
}

export const navLinks: NavLink[] = [
  { label: "Work", href: "/projects", index: "01" },
  { label: "About", href: "/about", index: "02" },
  { label: "Journey", href: "/journey", index: "03" },
  { label: "Contact", href: "/contact", index: "04" },
];
