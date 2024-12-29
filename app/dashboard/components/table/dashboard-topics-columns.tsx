"use client";

import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Topic } from "@/modules/topics/types";
import UserAvatar from "@/modules/user/components/profile/user-avatar";
import { urls } from "@/shared/urls";
import { ColumnDef } from "@tanstack/react-table";
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

export const dashboardTopicsColumns: ColumnDef<Topic>[] = [
  {
    accessorKey: "author",
    header: "User",
    cell: ({ row }) => {
      const user = row.getValue("author") as User;
      const userName = user?.name;

      return (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <Link
                href={urls.profile.view(user?.id)}
                className="flex min-w-[200px] items-center gap-4"
              >
                <UserAvatar image={user?.image || ""} />
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
    accessorKey: "isApproved",
    header: "Status",
    cell: ({ row }) => {
      const isApproved = row.getValue("isApproved");
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
    accessorKey: "updatedAt",
    header: () => <div className="whitespace-nowrap">Updated At</div>,
    cell: ({ row }) => {
      const value = row.getValue("updatedAt") as Date;
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
