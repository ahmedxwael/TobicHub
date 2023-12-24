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
import { NewTopicType } from "@/modules/topics/types";
import { UserSessionType } from "@/modules/user/types";
import { addTopic } from "@/utils/topic-utils";
import { Pencil, Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

type AddTopicProps = {
  userId: string;
  userSession?: UserSessionType;
};

type Input = {
  title: string;
  description: string;
  link: string;
  isApproved: boolean;
};

const initialTopic: NewTopicType = {
  title: "",
  description: "",
  link: "",
  approved: false,
  userId: "",
};

export default function AddTopic({ userId, userSession }: AddTopicProps) {
  const router = useRouter();

  const [topic, setTopic] = useState<NewTopicType>(initialTopic);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<Input>();

  const onSubmit = async () => {
    const body: NewTopicType = {
      title: topic.title,
      description: topic.description,
      approved: topic.approved,
      link: topic.link,
      userId,
    };

    await addTopic(body);

    setIsPopupOpen(false);
    router.refresh();
  };

  if (userSession && userSession.id !== userId) {
    return null;
  }

  return (
    <Dialog open={isPopupOpen} onOpenChange={(open) => setIsPopupOpen(open)}>
      <DialogTrigger asChild>
        <Button
          className="ml-auto flex items-center gap-2 capitalize"
          onClick={() => setIsPopupOpen(true)}
        >
          <Plus size={20} /> new topic
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
          <DialogTitle>New Topic</DialogTitle>
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
                value: topic.title,
                onChange: (e) => setTopic({ ...topic, title: e.target.value }),
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
                value: topic.description,
                onChange: (e) =>
                  setTopic({
                    ...topic,
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
                value: topic?.link,
                onChange: (e) =>
                  setTopic({
                    ...topic,
                    link: e.target.value.split(" ")[0],
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
                checked={topic?.approved}
                onCheckedChange={() =>
                  setTopic({
                    ...topic,
                    approved: !topic?.approved,
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
              {isSubmitting ? "Creating..." : "Create"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
