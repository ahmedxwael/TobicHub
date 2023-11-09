"use client";

import { cn } from "@/lib/utils";
import { links } from "@/shared/urls";
import Link from "next/link";
import { usePathname } from "next/navigation";

type Props = {
  closeMenu?: () => void;
  isAdmin?: boolean;
};

const NavLinks = ({ closeMenu, isAdmin }: Props) => {
  const pathname = usePathname();

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
