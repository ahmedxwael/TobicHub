"use client";

import { UserType } from "@/types";
import { updateUser } from "@/utils/user-utils";
import { Loader2, Pencil, Save } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

type UserNameProps = {
  user: UserType;
};

type InputsType = {
  display_name: string;
};

export default function UserName({ user }: UserNameProps) {
  const router = useRouter();

  const [isEditingName, setIsEditingName] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [newName, setNewName] = useState(user.display_name ?? user.name ?? "");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<InputsType>();

  const onSubmit: SubmitHandler<InputsType> = async (data) => {
    setIsSubmitting(true);

    await updateUser(user.id, data);

    router.refresh();
    setIsSubmitting(false);
    setIsEditingName(false);
  };

  return isEditingName ? (
    <form onSubmit={handleSubmit(onSubmit)} className="flex items-center gap-2">
      <Input
        autoFocus={true}
        type="text"
        placeholder="Enter your name"
        {...register("display_name", {
          value: newName,
          disabled: isSubmitting,
          onChange: (e) => setNewName(e.target.value),
        })}
      />
      {errors.display_name && (
        <span className="inline-block text-sm text-red-500">
          {errors.display_name.message}
        </span>
      )}
      <Button disabled={isSubmitting} variant="ghost" size="sm">
        {isSubmitting ? (
          <Loader2 size={20} className="animate-spin" />
        ) : (
          <Save />
        )}
      </Button>
    </form>
  ) : (
    <div className="flex items-center gap-2">
      <h1 className="text-center text-3xl font-bold capitalize tracking-wide">
        {user.display_name ?? user?.name}
      </h1>
      <Button
        onClick={() => setIsEditingName(true)}
        variant="ghost"
        size="icon"
      >
        <Pencil size={20} />
      </Button>
    </div>
  );
}
