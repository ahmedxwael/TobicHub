"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Task } from "@prisma/client";
import { Pencil } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { updateTask } from "../../../services/tasks-services";

type EditTaskProps = {
  task: Task;
};

type Input = {
  title: string;
  description: string;
  isCompleted: boolean;
  isImportant: boolean;
};

export default function EditTask({ task }: EditTaskProps) {
  const router = useRouter();

  const [updatedTask, setUpdatedTask] = useState<Task | Partial<Task>>(task);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<Input>();

  const onSubmit = async () => {
    const body = {
      title: updatedTask.title,
      description: updatedTask.description,
      isCompleted: updatedTask.completed,
      isImportant: updatedTask.important,
      userId: task.userId,
    };

    await updateTask(task.id, body);

    setIsPopupOpen(false);
    router.refresh();
  };

  return (
    <Dialog onOpenChange={(open) => setIsPopupOpen(open)}>
      <DialogTrigger asChild>
        <Button variant="ghost" className="h-fit w-fit p-2" onClick={() => {}}>
          <Pencil size={20} />
        </Button>
      </DialogTrigger>
      {isPopupOpen && (
        <DialogContent
          onInteractOutside={(e) => {
            if (isSubmitting) {
              e.preventDefault();
            }
          }}
        >
          <DialogHeader>
            <DialogTitle>Add new task</DialogTitle>
          </DialogHeader>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex w-full flex-col gap-6"
          >
            <div className="flex flex-col gap-3">
              <Label htmlFor="title" className="cursor-pointer">
                Title
              </Label>
              <Input
                autoFocus={true}
                type="text"
                id="title"
                placeholder="What is the topic?"
                disabled={isSubmitting}
                defaultValue={task.title}
                {...register("title", {
                  required: "Title is required.",
                  value: updatedTask.title,
                  onChange: (e) =>
                    setUpdatedTask({ ...updatedTask, title: e.target.value }),
                })}
              />
              {errors.title && (
                <span className="inline-block text-sm text-red-500">
                  {errors.title.message}
                </span>
              )}
            </div>
            <div className="flex flex-col gap-3">
              <Label htmlFor="description" className="cursor-pointer">
                Description
              </Label>
              <Textarea
                id="description"
                placeholder="What is this topic about...?"
                rows={10}
                disabled={isSubmitting}
                defaultValue={task.description}
                {...register("description", {
                  required: "Topic description is required.",
                  minLength: {
                    value: 1,
                    message: "Content must be at least 1 character.",
                  },
                  value: updatedTask.description,
                  onChange: (e) =>
                    setUpdatedTask({
                      ...updatedTask,
                      description: e.target.value,
                    }),
                })}
              />
              {errors.description && (
                <span className="inline-block text-sm text-red-500">
                  {errors.description.message}
                </span>
              )}
            </div>
            <div className="flex flex-wrap items-center gap-6">
              <div className="flex items-center gap-2">
                <Checkbox
                  id="isCompleted"
                  {...register("isCompleted")}
                  checked={updatedTask?.completed}
                  onCheckedChange={() =>
                    setUpdatedTask({
                      ...updatedTask,
                      completed: !updatedTask?.completed,
                    })
                  }
                />
                <Label
                  htmlFor="isCompleted"
                  className="shrink-0 cursor-pointer"
                >
                  Completed
                </Label>
              </div>
              <div className="flex items-center gap-2">
                <Checkbox
                  id="isImportant"
                  {...register("isImportant")}
                  checked={updatedTask?.important}
                  onCheckedChange={() =>
                    setUpdatedTask({
                      ...updatedTask,
                      important: !updatedTask?.important,
                    })
                  }
                />
                <Label
                  htmlFor="isImportant"
                  className="shrink-0 cursor-pointer"
                >
                  Important
                </Label>
              </div>
            </div>
            <div className="ml-auto flex gap-4">
              <Button
                disabled={isSubmitting}
                type="button"
                variant="outline"
                size="lg"
                onClick={() => setIsPopupOpen(false)}
              >
                Cancel
              </Button>
              <Button disabled={isSubmitting} size="lg" className="capitalize">
                {isSubmitting ? "Saving..." : "Save"}
              </Button>
            </div>
          </form>
        </DialogContent>
      )}
    </Dialog>
  );
}
