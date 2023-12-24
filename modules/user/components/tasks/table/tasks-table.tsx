"use client";

import DataTable from "@/components/table/data-table";
import { Input } from "@/components/ui/input";
import {
  ColumnFiltersState,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useState } from "react";
import { Task } from "../../../types";
import { TaskSelectFilter } from "./task-select-filter";
import { tasksColumns } from "./tasks-columns";

interface DataTableProps<TData> {
  tasks: TData[];
}

const tasksStatusOptions = [
  {
    label: "All",
    value: "all",
  },
  {
    label: "Completed",
    value: "completed",
  },
  {
    label: "Not Completed",
    value: "not-completed",
  },
];

const tasksPriorityOptions = [
  {
    label: "All",
    value: "all",
  },
  {
    label: "Important",
    value: "important",
  },
  {
    label: "Not Important",
    value: "not-important",
  },
];

export default function TasksTable<TData extends Task>({
  tasks,
}: DataTableProps<TData>) {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const table = useReactTable({
    columns: tasksColumns,
    data: tasks,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      columnFilters,
    },
  });

  return (
    <div>
      <div className="flex flex-wrap items-center gap-4 py-4">
        <Input
          placeholder="Enter task title"
          value={(table.getColumn("title")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("title")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        <div className="flex items-center gap-4">
          <TaskSelectFilter
            table={table}
            columnKey="isCompleted"
            options={tasksStatusOptions}
            filteringValue="completed"
            placeholder="Status"
          />
          <TaskSelectFilter
            table={table}
            columnKey="isImportant"
            options={tasksPriorityOptions}
            filteringValue="important"
            placeholder="Priority"
          />
        </div>
      </div>
      <DataTable columns={tasksColumns} table={table} />
    </div>
  );
}
