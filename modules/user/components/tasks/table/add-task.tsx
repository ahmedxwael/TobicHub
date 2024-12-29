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
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { createTask } from "../../../services/tasks-services";

type Input = {
  title: string;
  description: string;
  isCompleted: boolean;
  isImportant: boolean;
};

type AddTaskProps = {
  userId: string;
};

export type NewTask = {
  title: string;
  description: string;
  isCompleted: boolean;
  isImportant: boolean;
  userId: string;
};

const initialTask = {
  title: "",
  description: "",
  isCompleted: false,
  isImportant: false,
};

export default function AddTask({ userId }: AddTaskProps) {
  const router = useRouter();

  const [task, setTask] = useState<Task | Partial<Task>>(initialTask);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<Input>();

  const onSubmit = async () => {
    if (!task.title?.trim() || !task.description?.trim()) {
      return;
    }

    await createTask({ ...task, userId });

    reset();
    setTask(initialTask);
    setIsPopupOpen(false);
    router.refresh();
  };

  return (
    <Dialog
      open={isPopupOpen}
      onOpenChange={(open) => {
        if (!open) {
          setTask(initialTask);
          reset();
        }
        setIsPopupOpen(open);
      }}
    >
      <DialogTrigger asChild>
        <Button
          className="gap-2 capitalize"
          onClick={() => setIsPopupOpen(!isPopupOpen)}
        >
          <Plus size={20} /> new task
        </Button>
      </DialogTrigger>
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
              {...register("title", {
                required: "Title is required.",
                value: task.title,
                onChange: (e) => setTask({ ...task, title: e.target.value }),
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
              {...register("description", {
                required: "Topic description is required.",
                minLength: {
                  value: 1,
                  message: "Content must be at least 1 character.",
                },
                value: task.description,
                onChange: (e) =>
                  setTask({ ...task, description: e.target.value }),
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
                checked={task?.completed}
                onCheckedChange={() =>
                  setTask({ ...task, completed: !task?.completed })
                }
              />
              <Label htmlFor="isCompleted" className="shrink-0 cursor-pointer">
                Completed
              </Label>
            </div>
            <div className="flex items-center gap-2">
              <Checkbox
                id="isImportant"
                {...register("isImportant")}
                checked={task?.important}
                onCheckedChange={() =>
                  setTask({ ...task, important: !task?.important })
                }
              />
              <Label htmlFor="isImportant" className="shrink-0 cursor-pointer">
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
    </Dialog>
  );
}
