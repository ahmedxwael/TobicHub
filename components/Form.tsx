"use client";

import { TopicType } from "@/types";
import { NewTopicType, addTopic, editTopic } from "@/utils/topic-utils";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { ChangeEvent, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";

type Props = {
  type: "create" | "edit";
  currentTopic?: TopicType;
};

type InputsType = {
  title: string;
  description: string;
  link: string;
};

type InitialTopicValueType =
  | {
      title: string;
      description: string;
      creator: string;
      link: string;
    }
  | TopicType;

const Form = ({ type, currentTopic }: Props) => {
  const { data: session }: any = useSession();
  const router = useRouter();

  const initialTopicValue =
    type === "create"
      ? { title: "", description: "", creator: session?.user?.id, link: "" }
      : currentTopic;

  const [topic, setTopic] = useState<InitialTopicValueType>(initialTopicValue!);
  const [submitting, setSubmitting] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<InputsType>();

  const onSubmit: SubmitHandler<InputsType> = async () => {
    setSubmitting(true);

    try {
      if (type === "create") {
        await addTopic(topic as NewTopicType);
      } else if (type === "edit") {
        await editTopic(currentTopic?._id!, topic as TopicType);
      }

      setSubmitting(false);
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
          disabled={submitting}
          type="button"
          onClick={() => router.push("/topics")}
          variant="outline"
          size="lg"
        >
          Cancel
        </Button>
        <Button disabled={submitting} size="lg" className="capitalize">
          {submitting ? `${type}ting...` : `${type}`}
        </Button>
      </div>
    </form>
  );
};

export default Form;
