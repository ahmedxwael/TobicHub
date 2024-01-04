"use client";

import { cn } from "@/lib/utils";
import { URLS } from "@/shared/urls";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

type NavLinksProps = {
  closeMenu?: () => void;
  isAdmin?: boolean;
};

const links = [
  {
    name: "Home",
    href: URLS.home,
  },
  {
    name: "Topics",
    href: URLS.topics.list,
  },
  {
    name: "Contact Us",
    href: URLS.contactUs,
  },
  {
    name: "Dashboard",
    href: URLS.dashboard,
  },
];

export default function NavLinks({ closeMenu, isAdmin }: NavLinksProps) {
  const pathname = usePathname();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [pathname]);

  return (
    <>
      {links.map((link, idx) => {
        const activeLink = link.href === pathname;

        if (link.href === URLS.dashboard && !isAdmin) return;

        return (
          <Link
            key={idx}
            href={link.href}
            onClick={closeMenu}
            className={cn(
              activeLink && "text-primary",
              "inline-block font-medium transition-colors hover:text-primary"
            )}
          >
            {link.name}
          </Link>
        );
      })}
    </>
  );
}
