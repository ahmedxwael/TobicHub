"use client";

import { cn } from "@/lib/utils";
import { urls } from "@/shared/urls";
import { User } from "@prisma/client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

type NavLinksProps = {
  closeMenu?: () => void;
  userSession?: User;
};

const links = [
  {
    name: "Home",
    href: urls.home,
  },
  {
    name: "Topics",
    href: urls.topics.list,
  },
  {
    name: "Contact Us",
    href: urls.contactUs,
  },
];

export default function NavLinks({ closeMenu, userSession }: NavLinksProps) {
  const pathname = usePathname();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [pathname]);

  return (
    <>
      {links.map((link, idx) => {
        const activeLink = link.href === pathname;

        if (link.href === urls.dashboard && !userSession?.moderator) return;

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
