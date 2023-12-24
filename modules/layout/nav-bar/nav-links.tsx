"use client";

import { cn } from "@/lib/utils";
import { links } from "@/shared/urls";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

type NavLinksProps = {
  closeMenu?: () => void;
  isAdmin?: boolean;
};

const NavLinks = ({ closeMenu, isAdmin }: NavLinksProps) => {
  const pathname = usePathname();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [pathname]);

  return (
    <>
      {links.map((link, idx) => {
        const activeLink = link.href === pathname;

        if (link.href === "/dashboard" && !isAdmin) return;

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
};

export default NavLinks;
