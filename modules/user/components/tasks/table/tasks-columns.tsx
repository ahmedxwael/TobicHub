"use client";

import { Badge } from "@/components/ui/badge";
import { Task } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import { MoveDown, MoveUp } from "lucide-react";
import EditTask from "./edit-task";
import TaskControlMenu from "./task-control-menu";
import ViewTask from "./view-task";

export const tasksColumns: ColumnDef<Task>[] = [
  {
    accessorKey: "title",
    header: "Title",
    cell: ({ row }) => {
      const value = row.getValue("title") as string;

      return <div className="line-clamp-1 min-w-[100px]">{value}</div>;
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
    accessorKey: "isCompleted",
    header: "Status",
    cell: ({ row }) => {
      const isCompleted = row.getValue("isCompleted");
      const text = isCompleted ? "Completed" : "Not Completed";

      return (
        <Badge
          variant={isCompleted ? "default" : "outline"}
          className="w-full justify-center whitespace-nowrap py-1"
        >
          {text}
        </Badge>
      );
    },
  },

  {
    accessorKey: "isImportant",
    header: "Priority",
    cell: ({ row }) => {
      const task = row.original;
      const value = task.important ? "important" : "not-important";

      return value === "important" ? (
        <Badge
          variant="destructive"
          className="flex items-center justify-center gap-1 py-1"
        >
          <MoveUp size={15} />
          High
        </Badge>
      ) : (
        <Badge
          variant="outline"
          className="flex items-center justify-center  gap-1 py-1"
        >
          <MoveDown size={15} />
          Low
        </Badge>
      );
    },
  },
  {
    accessorKey: "updatedAt",
    header: "Updated at",
    cell: ({ row }) => {
      const task = row.original;
      const value = task.updatedAt.toDateString();

      return <div className="whitespace-nowrap">{value}</div>;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const task = row.original;

      return (
        <div className="flex items-center gap-2">
          <EditTask task={task} />
          <ViewTask task={task} />
          <TaskControlMenu task={task} />
        </div>
      );
    },
  },
];
