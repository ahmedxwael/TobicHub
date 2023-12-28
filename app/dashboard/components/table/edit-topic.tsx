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
import { Topic } from "@/modules/topics/types";
import { editTopic } from "@/utils/topic-utils";
import { Pencil } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

type EditTopicProps = {
  topic: Topic;
};

type Input = {
  title: string;
  description: string;
  link: string;
  isApproved: boolean;
};

export default function EditTopic({ topic }: EditTopicProps) {
  const router = useRouter();

  const [updatedTopic, setUpdatedTopic] = useState<Topic | Partial<Topic>>(
    topic
  );
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<Input>();

  const onSubmit = async () => {
    const body: Partial<Topic> = {
      title: updatedTopic.title,
      description: updatedTopic.description,
      isApproved: updatedTopic.isApproved,
      resource: updatedTopic.resource,
      authorId: topic.authorId,
    };

    await editTopic(topic.id, body);

    setIsPopupOpen(false);
    router.refresh();
  };

  return (
    <Dialog open={isPopupOpen} onOpenChange={setIsPopupOpen}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          className="h-fit w-fit p-2"
          onClick={() => setIsPopupOpen(true)}
        >
          <Pencil size={20} />
        </Button>
      </DialogTrigger>
      <DialogContent
        className="max-w-[600px]"
        onInteractOutside={(e) => {
          if (isSubmitting) {
            e.preventDefault();
          }
        }}
      >
        <DialogHeader>
          <DialogTitle>Update topic</DialogTitle>
        </DialogHeader>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mt-4 flex w-full flex-col gap-6"
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
              defaultValue={topic.title}
              {...register("title", {
                required: "Title is required.",
                value: updatedTopic.title,
                onChange: (e) =>
                  setUpdatedTopic({ ...updatedTopic, title: e.target.value }),
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
              defaultValue={topic.description}
              {...register("description", {
                required: "Topic description is required.",
                minLength: {
                  value: 1,
                  message: "Content must be at least 1 character.",
                },
                value: updatedTopic.description,
                onChange: (e) =>
                  setUpdatedTopic({
                    ...updatedTopic,
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
          <div className="flex flex-col gap-3">
            <Label htmlFor="link" className="cursor-pointer">
              Recourses
            </Label>
            <Input
              id="link"
              placeholder="Recourses"
              type="url"
              disabled={isSubmitting}
              {...register("link", {
                value: topic?.resource,
                onChange: (e) =>
                  setUpdatedTopic({
                    ...topic,
                    resource: e.target.value.split(" ")[0],
                  }),
              })}
            />
            {errors.link && (
              <span className="inline-block text-sm text-red-500">
                {errors.link.message}
              </span>
            )}
          </div>
          <div className="flex flex-wrap items-center gap-6">
            <div className="flex items-center gap-2">
              <Checkbox
                id="isApproved"
                {...register("isApproved")}
                checked={updatedTopic?.isApproved}
                onCheckedChange={() =>
                  setUpdatedTopic({
                    ...updatedTopic,
                    isApproved: !updatedTopic?.isApproved,
                  })
                }
              />
              <Label htmlFor="isApproved" className="shrink-0 cursor-pointer">
                Approved
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
