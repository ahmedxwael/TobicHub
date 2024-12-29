"use client";

import CustomAlertDialog from "@/components/custom-alert-dialog";
import { Button } from "@/components/ui/button";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { deleteTask, updateTask } from "@/modules/user/services/tasks-services";
import { Task } from "@prisma/client";
import { MoreHorizontal } from "lucide-react";
import { useRouter } from "next/navigation";
import { ButtonHTMLAttributes, useState } from "react";

type TaskControlMenuProps = {
  task: Task;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export default function TaskControlMenu({
  task,
  className,
}: TaskControlMenuProps) {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleEditTask = async (updatedTask: Partial<Task>) => {
    setIsLoading(true);

    await updateTask(task.id, updatedTask);

    setIsLoading(false);
    setIsDropdownOpen(false);
    router.refresh();
  };

  const handDeleteTask = async () => {
    setIsLoading(true);

    await deleteTask(task.id);

    setIsLoading(false);
    setIsDropdownOpen(false);
    router.refresh();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          onClick={() => setIsDropdownOpen(true)}
          className={cn("h-fit w-fit px-2", className)}
          variant="ghost"
          aria-label="options"
        >
          <MoreHorizontal size={15} />
        </Button>
      </DropdownMenuTrigger>
      {isDropdownOpen && (
        <DropdownMenuContent align="end" className="w-[170px]">
          <Separator />
          <Button
            variant="ghost"
            className="w-full cursor-pointer"
            disabled={isLoading}
            onClick={() => handleEditTask({ important: !task.important })}
          >
            {task.important ? "Unimportant" : "Important"}
          </Button>
          <Separator />
          <Button
            variant="ghost"
            className="w-full cursor-pointer"
            disabled={isLoading}
            onClick={() => handleEditTask({ completed: !task.completed })}
          >
            {task.completed ? "Not completed" : "Completed"}
          </Button>
          <Separator />
          <CustomAlertDialog
            action={handDeleteTask}
            title="Delete"
            variant="ghost"
            description="This action cannot be undone. Are you sure that you want to delete this topic?"
            className="text-red-600 hover:bg-red-600 hover:text-white"
            disabled={isLoading}
          />
        </DropdownMenuContent>
      )}
    </DropdownMenu>
  );
}
