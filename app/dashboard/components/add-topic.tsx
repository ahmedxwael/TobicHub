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
import { useToast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";
import { NewTopic } from "@/modules/topics/types";
import { UserSessionType } from "@/modules/user/types";
import { addTopic } from "@/utils/topic-utils";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

type AddTopicProps = {
  userId: string;
  userSession?: UserSessionType;
  className?: string;
};

type Input = {
  title: string;
  description: string;
  resource: string;
  isApproved: boolean;
};

const initialTopic: NewTopic = {
  title: "",
  description: "",
  resource: "",
  isApproved: false,
  authorId: "",
};

export default function AddTopic({
  userId,
  userSession,
  className,
}: AddTopicProps) {
  const { toast } = useToast();
  const router = useRouter();

  const [topic, setTopic] = useState<NewTopic>(initialTopic);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<Input>();

  const onSubmit = async () => {
    const body: NewTopic = {
      title: topic.title,
      description: topic.description,
      isApproved: topic.isApproved,
      resource: topic.resource,
      authorId: userId,
    };

    await addTopic(body);

    toast({
      title: "Your new topic has been submitted successfully.",
      description:
        "It will be reviewed by our team before it can be published. Thank you for your contribution and patience during this process.",
      variant: "success",
    });
    reset();
    setTopic(initialTopic);
    setIsPopupOpen(false);
    router.refresh();
  };

  if (userSession && userSession.id !== userId) {
    return null;
  }

  return (
    <Dialog
      open={isPopupOpen}
      onOpenChange={(open) => {
        if (!open) {
          setTopic(initialTopic);
          reset();
        }
        setIsPopupOpen(open);
      }}
    >
      <DialogTrigger asChild>
        <Button
          className={cn("flex items-center gap-2 capitalize", className)}
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
              {...register("resource", {
                value: topic?.resource,
                onChange: (e) =>
                  setTopic({
                    ...topic,
                    resource: e.target.value.split(" ")[0],
                  }),
              })}
            />
            {errors.resource && (
              <span className="inline-block text-sm text-red-500">
                {errors.resource.message}
              </span>
            )}
          </div>
          {userSession?.admin && (
            <div className="flex flex-wrap items-center gap-6">
              <div className="flex items-center gap-2">
                <Checkbox
                  id="isApproved"
                  {...register("isApproved")}
                  checked={topic?.isApproved}
                  onCheckedChange={() =>
                    setTopic({
                      ...topic,
                      isApproved: !topic?.isApproved,
                    })
                  }
                />
                <Label htmlFor="isApproved" className="shrink-0 cursor-pointer">
                  Approved
                </Label>
              </div>
            </div>
          )}
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
