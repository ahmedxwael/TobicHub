"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { buttonVariants } from "../ui/button";

type DashboardSideNavProps = {};

const sidebarNavItems = [
  {
    title: "Topics",
    href: "/dashboard",
  },
  {
    title: "Users",
    href: "/dashboard/users",
  },
];

export default function DashboardSideNav({}: DashboardSideNavProps) {
  const pathname = usePathname();

  return (
    <aside className="lg:w-1/5">
      <nav
        className={cn("flex space-x-2 lg:flex-col lg:space-x-0 lg:space-y-1")}
      >
        {sidebarNavItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              buttonVariants({ variant: "ghost" }),
              pathname === item.href
                ? "bg-muted hover:bg-muted"
                : "hover:bg-transparent hover:underline",
              "inline-block justify-start"
            )}
          >
            {item.title}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
