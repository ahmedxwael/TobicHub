"use client";

import DataTable from "@/components/table/data-table";
import { SelectFilter } from "@/components/table/select-filter";
import { Input } from "@/components/ui/input";
import { TopicType } from "@/modules/topics/types";
import {
  ColumnFiltersState,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import React, { useState } from "react";
import { dashboardTopicsColumns } from "./dashboard-topics-columns";

type TopicsTableProps = {
  topics: TopicType[];
};

const statusOptions = [
  {
    label: "All",
    value: "all",
  },
  {
    label: "Approved",
    value: "approved",
  },
  {
    label: "Not Approved",
    value: "not-approved",
  },
];

export default function TopicsTable({ topics }: TopicsTableProps) {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const table = useReactTable({
    columns: dashboardTopicsColumns,
    data: topics,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      columnFilters,
    },
  });

  return (
    <div className="">
      <div className="flex flex-wrap items-center gap-4 py-4">
        <Input
          placeholder="Enter topic title"
          value={(table.getColumn("title")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("title")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        <div className="flex items-center gap-4">
          <SelectFilter
            table={table}
            columnKey="approved"
            options={statusOptions}
            filteringValue="approved"
            placeholder="Status"
          />
        </div>
      </div>
      <DataTable table={table} columns={dashboardTopicsColumns} />
    </div>
  );
}
