"use client";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { URLS } from "@/shared/urls";
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
    title: "Topics",
    href: URLS.profile.view,
  },
  {
    title: "Tasks",
    href: URLS.profile.tasks,
    protected: true,
  },
];

export default function ProfileSideNav({
  id,
  userSession,
}: ProfileSideNavProps) {
  const pathname = usePathname();

  return (
    <aside className="w-[250px] shrink-0">
      <nav
        className={cn("flex space-x-2 lg:flex-col lg:space-x-0 lg:space-y-1")}
      >
        {sidebarNavItems.map((item, index) => {
          if (
            item.protected &&
            (!userSession || userSession.id !== id || !userSession.admin)
          ) {
            return null;
          }

          return (
            <Link
              key={index}
              href={item.href(id)}
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
