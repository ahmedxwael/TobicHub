"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";
import axios from "axios";
import { PenSquare } from "lucide-react";
import Image from "next/image";
import { FormEvent, useState } from "react";
import { UserSessionType, UserType } from "../types";

type UserImageProps = {
  user: UserType;
  userSession: UserSessionType;
};

export default function UserImage({ user, userSession }: UserImageProps) {
  const { toast } = useToast();

  const [isLoading, setIsLoading] = useState(false);

  const [image, setImage] = useState<File>();

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!image) return;

    setIsLoading(true);

    try {
      const formData = new FormData();
      formData.set("image", image);

      await axios.post(`/api/upload-image`, formData);
    } catch (error) {
      toast({
        title: "Error",
        description: "Couldn't upload image",
        variant: "destructive",
      });
    }

    setIsLoading(false);
  }

  return (
    <div className="group relative h-[150px] w-[150px] overflow-hidden rounded-full bg-white/10">
      <Image
        src={user?.image!}
        alt="User Profile image"
        width={150}
        height={150}
        quality={100}
        className="rounded-full"
      />

      {userSession && userSession.id === user.id && (
        <Dialog>
          <DialogTrigger asChild>
            <Button
              variant="link"
              size="sm"
              className="pointer-events-none absolute inset-0 flex h-full w-full items-center justify-center bg-input/60 text-primary opacity-0 transition-opacity duration-300 group-hover:pointer-events-auto group-hover:opacity-100"
            >
              <PenSquare size={20} />
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <div className="text-center">coming soon</div>
            {/* <DialogHeader>
            <DialogTitle>Edit your profile image</DialogTitle>
            <DialogDescription>
              You can changes your profile image from here. Click save when
              you&apos;re done.
            </DialogDescription>
          </DialogHeader>
          <form
            onSubmit={(e) => handleSubmit(e)}
            className="mt-4 flex flex-col gap-4"
          >
            <Label htmlFor="image" className="cursor-pointer">
              Image
            </Label>
            <Input
              disabled={isLoading}
              type="file"
              id="image"
              name="image"
              accept=".png, .jpg, .jpeg"
              className="cursor-pointer"
              onChange={(e) => setImage(e.target.files?.[0])}
            />
            <Button disabled={isLoading} className="ml-auto">
              {isLoading ? "Saving..." : "Save changes"}
            </Button>
          </form> */}
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
