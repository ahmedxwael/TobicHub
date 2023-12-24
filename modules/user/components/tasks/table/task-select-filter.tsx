import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Table } from "@tanstack/react-table";
import { PlusCircle } from "lucide-react";

type TaskSelectFilterProps = {
  table: Table<any>;
  columnKey: string;
  options: {
    label: string;
    value: string;
  }[];
  filteringValue: any;
  placeholder: string;
};

export function TaskSelectFilter({
  table,
  columnKey,
  options,
  filteringValue,
  placeholder,
}: TaskSelectFilterProps) {
  return (
    <Select
      onValueChange={(value) => {
        if (value === "all") {
          table.getColumn(columnKey)?.setFilterValue(null);
        } else {
          table.getColumn(columnKey)?.setFilterValue(value === filteringValue);
        }
      }}
    >
      <SelectTrigger className="w-fit gap-2">
        <PlusCircle size={15} />
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {options.map((option, index) => (
          <SelectItem
            key={index}
            className="cursor-pointer"
            value={option.value}
          >
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
