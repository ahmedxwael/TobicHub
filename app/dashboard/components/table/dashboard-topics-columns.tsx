"use client";

import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { TopicType } from "@/modules/topics/types";
import { URLS } from "@/shared/urls";
import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";
import Link from "next/link";
import DashboardTopicControlMenu from "../dashboard-topic-control-menu";
import EditTopic from "./edit-topic";
import ViewTopic from "./view-topic";

type User = {
  id: string;
  name: string;
  image: string;
  admin: boolean;
};

export const dashboardTopicsColumns: ColumnDef<TopicType>[] = [
  {
    accessorKey: "User",
    header: "User",
    cell: ({ row }) => {
      const user = row.getValue("User") as User;
      const userName = user.name;

      return (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <Link
                href={URLS.profile.view(user.id)}
                className="flex min-w-[200px] items-center gap-4"
              >
                <Image
                  priority
                  src={user?.image || "/images/avatar.png"}
                  alt="user image"
                  width={500}
                  height={500}
                  className="h-10 w-10 rounded-full border-2 bg-muted object-cover"
                />
                <div>{userName}</div>
              </Link>
            </TooltipTrigger>
            <TooltipContent>
              <p>{userName}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      );
    },
  },
  {
    accessorKey: "title",
    header: "Title",
    cell: ({ row }) => {
      const value = row.getValue("title") as string;

      return (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="line-clamp-1">{value}</div>
            </TooltipTrigger>
            <TooltipContent>
              <p>{value}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      );
    },
  },
  {
    accessorKey: "description",
    header: "Description",
    cell: ({ row }) => {
      const value = row.getValue("description") as string;

      return <div className="line-clamp-1">{value}</div>;
    },
  },
  {
    accessorKey: "approved",
    header: "Status",
    cell: ({ row }) => {
      const isApproved = row.getValue("approved");
      const text = isApproved ? "Approved" : "Not Approved";

      return (
        <Badge
          variant={isApproved ? "default" : "outline"}
          className="w-full justify-center whitespace-nowrap py-1"
        >
          {text}
        </Badge>
      );
    },
  },
  {
    accessorKey: "updated_at",
    header: () => <div className="whitespace-nowrap">Updated At</div>,
    cell: ({ row }) => {
      const value = row.getValue("updated_at") as Date;
      const text = value.toDateString();

      return (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="line-clamp-1">{text}</div>
            </TooltipTrigger>
            <TooltipContent>
              <p>{text}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const topic = row.original;

      return (
        <div className="flex items-center gap-2">
          <EditTopic topic={topic} />
          <ViewTopic topic={topic} />
          <DashboardTopicControlMenu topic={topic} />
        </div>
      );
    },
  },
];
