"use client";

import { NewTopicType, TopicType } from "@/types";
import { addTopic, editTopic } from "@/utils/topic-utils";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { ChangeEvent, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { UserType } from "./nav-bar/user-buttons";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { useToast } from "./ui/use-toast";

type Props = {
  type: "create" | "edit";
  currentTopic?: TopicType | null;
};

export type InputsType = {
  title: string;
  description: string;
  link: string;
};

const Form = ({ type, currentTopic }: Props) => {
  const { data: session } = useSession();
  const user = session?.user as UserType;

  const router = useRouter();

  const { toast } = useToast();

  const [topic, setTopic] = useState<TopicType | NewTopicType>(currentTopic!);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<InputsType>();

  const onSubmit: SubmitHandler<InputsType> = async () => {
    setIsSubmitting(true);

    try {
      if (type === "create") {
        await addTopic({
          ...topic,
          userId: user?.id,
          approved: user.admin,
        });

        if (!user.admin) {
          toast({
            title: "Your new topic has been submitted successfully.",
            description:
              "It will be reviewed by our team before it can be published. Thank you for your contribution and patience during this process.",
            variant: "success",
          });
        }
      } else if (type === "edit") {
        await editTopic(currentTopic?.id!, {
          description: topic?.description,
          link: topic?.link,
          title: topic?.title,
          userId: topic?.userId,
        });

        toast({
          title: "Topic has been updated successfully.",
          variant: "default",
        });
      }

      setIsSubmitting(false);
      router.refresh();
      router.back();
    } catch (error: any) {
      throw new Error("Something went wrong\n" + error.message);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex w-[500px] max-w-full flex-col gap-6"
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
            value: topic?.title,
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
          {...register("description", {
            required: "Topic description is required.",
            minLength: {
              value: 10,
              message: "Content must be at least 10 characters.",
            },
            value: topic?.description,
            onChange: (e) =>
              setTopic({ ...topic, description: e.target.value }),
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
            onChange: (e: ChangeEvent<HTMLInputElement>) =>
              setTopic({ ...topic, link: e.target.value.split(" ")[0] }),
          })}
        />
        {errors.link && (
          <span className="inline-block text-sm text-red-500">
            {errors.link.message}
          </span>
        )}
      </div>
      <div className="ml-auto flex gap-4">
        <Button
          disabled={isSubmitting}
          type="button"
          onClick={router.back}
          variant="outline"
          size="lg"
        >
          Cancel
        </Button>
        <Button disabled={isSubmitting} size="lg" className="capitalize">
          {isSubmitting ? `${type}ting...` : `${type}`}
        </Button>
      </div>
    </form>
  );
};

export default Form;
