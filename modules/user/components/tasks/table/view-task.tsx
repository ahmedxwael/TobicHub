"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Task } from "@/modules/user/types";
import { Eye } from "lucide-react";

type ViewTaskButtonProps = {
  task: Task;
};

export default function ViewTask({ task }: ViewTaskButtonProps) {
  return (
    <Dialog>
      <DialogTrigger asChild className="w-full">
        <Button variant="ghost" className="h-fit w-fit p-2">
          <Eye size={20} />
        </Button>
      </DialogTrigger>
      <DialogContent className="space-y-2">
        <DialogHeader className="space-y-1">
          <div className="line-clamp-3 text-xl font-semibold capitalize">
            {task.title}
          </div>
          <div className="text-sm text-muted-foreground">
            {task.updatedAt.toDateString()}
          </div>
        </DialogHeader>
        <DialogDescription className="max-h-[300px] overflow-auto text-justify text-base leading-normal">
          {task.description}
        </DialogDescription>
      </DialogContent>
    </Dialog>
  );
}
