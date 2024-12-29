"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";
import { User } from "@prisma/client";
import { Loader2, Pencil, Save, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { updateUser } from "../../services/profile-services";

type UserNameProps = {
  user: User;
  userSession?: User;
};

export default function UserName({ user, userSession }: UserNameProps) {
  const router = useRouter();
  const isUserPage = userSession && userSession.id === user.id;
  const initialNameValue = user.name;

  const { toast } = useToast();

  const [isEditingName, setIsEditingName] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [newName, setNewName] = useState(initialNameValue);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsSubmitting(true);

    await updateUser(user.id, { name: newName });

    toast({
      title: "Your name has been updated successfully.",
      variant: "success",
    });

    router.refresh();
    setIsSubmitting(false);
    setIsEditingName(false);
  }

  return isEditingName ? (
    <form
      onSubmit={(e) => handleSubmit(e)}
      className="flex max-w-[240px] gap-3"
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
          aria-label="cancel"
          className="absolute right-0 top-1/2 -translate-y-1/2"
          onClick={() => {
            setIsEditingName(false);
            setNewName(initialNameValue);
          }}
        >
          <X size={20} />
        </Button>
      </div>
      <Button aria-label="edit user name" disabled={isSubmitting} size="sm">
        {isSubmitting ? (
          <Loader2 size={20} className="animate-spin" />
        ) : (
          <Save size={20} />
        )}
      </Button>
    </form>
  ) : (
    <div className="relative flex items-center gap-2">
      <h1
        onClick={() => {
          if (isUserPage) {
            setIsEditingName(true);
          }
        }}
        className={cn(
          "text-center text-3xl font-bold capitalize tracking-wide",
          isUserPage && "cursor-pointer"
        )}
      >
        {initialNameValue}
      </h1>
      {isUserPage && (
        <Pencil className="absolute -right-4 -top-4 text-primary" size={18} />
      )}
    </div>
  );
}
