"use client";

import { UserType } from "@/types";
import { updateUser } from "@/utils/user-utils";
import { Loader2, Pencil, Save, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

type UserNameProps = {
  user: UserType;
  userSession: UserType;
};

export default function UserName({ user, userSession }: UserNameProps) {
  const router = useRouter();

  const [isEditingName, setIsEditingName] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const initialNameValue = user.display_name || user.name || "";

  const [newName, setNewName] = useState(initialNameValue);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsSubmitting(true);

    await updateUser(user.id, { display_name: newName });

    router.refresh();
    setIsSubmitting(false);
    setIsEditingName(false);
  }

  return isEditingName ? (
    <form
      onSubmit={(e) => handleSubmit(e)}
      className="flex max-w-[240px] flex-col gap-2"
    >
      <div className="relative flex items-center justify-center gap-2">
        <Input
          name="display_name"
          type="text"
          className="pr-12"
          placeholder="Enter your name"
          autoFocus={true}
          disabled={isSubmitting}
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
        />
        <Button
          type="button"
          disabled={isSubmitting}
          variant="ghost"
          size="sm"
          className="absolute right-0 top-1/2 -translate-y-1/2"
          onClick={() => setIsEditingName(false)}
        >
          <X size={20} />
        </Button>
      </div>
      <Button disabled={isSubmitting} size="sm">
        {isSubmitting ? (
          <Loader2 size={20} className="animate-spin" />
        ) : (
          <Save size={20} />
        )}
      </Button>
    </form>
  ) : (
    <div className="flex items-center gap-2">
      <h1 className="text-center text-3xl font-bold capitalize tracking-wide">
        {initialNameValue}
      </h1>
      {userSession && userSession.id === user.id && (
        <Button
          onClick={() => setIsEditingName(true)}
          variant="ghost"
          size="icon"
          className="text-primary hover:bg-primary hover:text-white"
        >
          <Pencil size={20} />
        </Button>
      )}
    </div>
  );
}
