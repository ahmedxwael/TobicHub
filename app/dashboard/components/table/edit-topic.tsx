"use client";

import { editTopicAction } from "@/actions/topics/topic-actions/edit-topic";
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
import TopicResourceField from "@/modules/topics/components/form/topic-resource-field";
import { validateURL } from "@/utils/utils";
import { Topic, User } from "@prisma/client";
import { Pencil } from "lucide-react";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { Resource } from "../add-topic";

type EditTopicProps = {
  topic: Topic;
  title?: string;
  onClick?: () => void;
  className?: string;
  user?: User;
};

type Input = {
  title: string;
  description: string;
  resource: string;
  approved: boolean;
};

export default function EditTopic({
  topic,
  title,
  onClick,
  className,
  user,
}: EditTopicProps) {
  const router = useRouter();
  const resourcesRef = useRef<HTMLFormElement>(null);
  const { toast } = useToast();

  const [resources, setResources] = useState<Resource[]>(
    topic.resources.map((resource) => ({
      resource,
      approved: true,
    }))
  );
  const [updatedTopic, setUpdatedTopic] = useState<Topic | Partial<Topic>>(
    topic
  );
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<Input>();

  const onSubmit = async () => {
    const isValidFields = handleResourcesValidation();

    if (!isValidFields) return;

    const body: Partial<Topic> = {
      title: updatedTopic.title,
      description: updatedTopic.description,
      approved: updatedTopic.approved,
      resources: [...resources.map((resource) => resource.resource)],
      authorId: topic.authorId,
    };

    await editTopicAction(topic.id, body);

    setIsPopupOpen(false);
    router.refresh();
  };

  const handleResourcesValidation = () => {
    if (resources.length >= 5) {
      toast({
        title: "Something went wrong.",
        description: "You can only add a maximum of 5 resources.",
        variant: "destructive",
      });

      return false;
    } else if (
      resources.some(
        (resource) =>
          resource.resource.trim() === "" || !validateURL(resource.resource)
      )
    ) {
      toast({
        title: "Something went wrong.",
        description: "Please check your resources and try again.",
        variant: "destructive",
      });

      return false;
    } else if (resources.some((resource) => !resource.approved)) {
      toast({
        title: "Warning!",
        description: "Make sure all resources are approved.",
        variant: "info",
      });

      return false;
    }

    return true;
  };

  return (
    <Dialog
      open={isPopupOpen}
      onOpenChange={(open) => {
        if (!open) {
          setUpdatedTopic({});
          reset();
        }
        setResources(
          topic.resources.map((resource) => ({
            resource,
            approved: true,
          }))
        );
        setIsPopupOpen(open);
      }}
    >
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          className={cn("h-fit w-fit p-2", className)}
          onClick={() => {
            onClick?.();
            setIsPopupOpen(true);
          }}
        >
          {title ? title : <Pencil size={20} />}
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
            <Label
              htmlFor="link"
              className="flex cursor-pointer items-center gap-2"
            >
              Resources
              <span className="ml-2 text-xs text-muted-foreground">
                (optional)
              </span>
            </Label>
            <form
              ref={resourcesRef}
              className="flex max-h-[180px] flex-col gap-2 overflow-y-auto p-2"
            >
              {resources.map((resource, index) => (
                <TopicResourceField
                  key={index}
                  index={index}
                  resource={resource}
                  resources={resources}
                  setResources={setResources}
                />
              ))}
            </form>
            {errors.resource && (
              <span className="inline-block text-sm text-red-500">
                {errors.resource.message}
              </span>
            )}
            <Button
              type="button"
              variant="outline"
              className="w-fit capitalize"
              onClick={() => {
                const isValidFields = handleResourcesValidation();

                if (!isValidFields) return;

                setResources([...resources, { resource: "", approved: false }]);
                setTimeout(() => {
                  resourcesRef.current?.scrollTo({
                    behavior: "smooth",
                    top: resourcesRef.current?.scrollHeight,
                  });
                });
              }}
            >
              add resource
            </Button>
          </div>
          {user && user.moderator && (
            <div className="flex items-center gap-2">
              <Checkbox
                id="approved"
                {...register("approved")}
                checked={updatedTopic?.approved}
                onCheckedChange={() =>
                  setUpdatedTopic({
                    ...updatedTopic,
                    approved: !updatedTopic?.approved,
                  })
                }
              />
              <Label htmlFor="approved" className="shrink-0 cursor-pointer">
                Approved
              </Label>
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
              {isSubmitting ? "Saving..." : "Save"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
