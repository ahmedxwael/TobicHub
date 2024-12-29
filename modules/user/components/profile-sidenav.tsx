"use client";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { urls } from "@/shared/urls";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { UserSessionType } from "../types";

type ProfileSideNavProps = {
  id: string;
  userSession: UserSessionType;
};

const sidebarNavItems = [
  {
    title: "Profile",
    href: urls.profile.view,
  },
  {
    title: "Topics",
    href: urls.profile.topics,
  },
  {
    title: "Tasks",
    href: urls.profile.tasks,
    protected: true,
  },
];

export default function ProfileSideNav({
  id,
  userSession,
}: ProfileSideNavProps) {
  const pathname = usePathname();

  return (
    <aside className="relative w-[250px] shrink-0">
      <nav
        className={cn("flex space-x-2 lg:flex-col lg:space-x-0 lg:space-y-1")}
      >
        {sidebarNavItems.map((item, index) => {
          const href =
            typeof item.href === "function" ? item.href(id) : item.href;
          const isNotTheUser = !userSession || userSession.id !== id;

          if (item.protected && isNotTheUser) {
            return null;
          }

          return (
            <Link
              key={index}
              href={href}
              className={cn(
                buttonVariants({ variant: "ghost" }),
                pathname === item.href(id)
                  ? "bg-muted text-primary hover:bg-muted hover:text-primary"
                  : "hover:bg-transparent hover:underline",
                "inline-block justify-start"
              )}
            >
              {item.title}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
