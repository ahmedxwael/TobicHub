"use client";

import { addTopicAction } from "@/actions/topics/topic-actions/add-topic";
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
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";

type AddTopicProps = {
  userId: string;
  userSession?: User;
  className?: string;
};

type Input = {
  title: string;
  description: string;
  resource: string;
  approved: boolean;
};

export type Resource = {
  resource: string;
  approved: boolean;
};

export default function AddTopic({
  userId,
  userSession,
  className,
}: AddTopicProps) {
  const { toast } = useToast();
  const router = useRouter();
  const resourcesRef = useRef<HTMLFormElement>(null);

  const [topicObject, setTopicObject] = useState<Partial<Topic>>({});
  const [resources, setResources] = useState<Resource[]>([]);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<Input>();

  const onSubmit = async () => {
    if (
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

      return;
    }

    if (resources.some((resource) => !resource.approved)) {
      toast({
        title: "Warning!",
        description: "Make sure all resources are approved.",
        variant: "info",
      });
      return;
    }

    const body = {
      resources: resources.map((resource) => resource.resource),
      author: userSession,
      ...topicObject,
    };

    await addTopicAction(body);

    toast({
      title: "Your new topic has been submitted successfully.",
      description:
        "It will be reviewed by our team before it can be published. Thank you for your contribution and patience during this process.",
      variant: "success",
    });

    reset();
    setTopicObject({});
    setIsPopupOpen(false);
    router.refresh();
  };

  if (userSession && userSession.id !== userId) {
    return null;
  }

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
          setTopicObject({});
          reset();
        }
        setResources([]);
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
        <form className="mt-4 flex w-full flex-col gap-6">
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
              defaultValue={topicObject.title}
              {...register("title", {
                required: "Title is required.",
                value: topicObject.title,
                onChange: (e) =>
                  setTopicObject({ ...topicObject, title: e.target.value }),
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
              defaultValue={topicObject.description}
              {...register("description", {
                required: "Topic description is required.",
                minLength: {
                  value: 1,
                  message: "Content must be at least 1 character.",
                },
                value: topicObject.description,
                onChange: (e) =>
                  setTopicObject({
                    ...topicObject,
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
        </form>
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
                index={index}
                resource={resource}
                resources={resources}
                setResources={setResources}
                key={index}
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

              if (!isValidFields) {
                return;
              }

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
        <div className="mt-2 flex flex-col gap-2">
          {userSession?.moderator && (
            <div className="flex flex-wrap items-center gap-6">
              <div className="flex items-center gap-2">
                <Checkbox
                  id="approved"
                  {...register("approved")}
                  checked={topicObject?.approved}
                  onCheckedChange={() =>
                    setTopicObject({
                      ...topicObject,
                      approved: !topicObject?.approved,
                    })
                  }
                />
                <Label htmlFor="approved" className="shrink-0 cursor-pointer">
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
              onClick={() => {
                setIsPopupOpen(false);
              }}
            >
              Cancel
            </Button>
            <Button
              onClick={handleSubmit(onSubmit)}
              disabled={isSubmitting}
              size="lg"
              className="capitalize"
            >
              {isSubmitting ? "Creating..." : "Create"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
