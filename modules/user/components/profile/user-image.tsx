"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { User } from "@prisma/client";
import axios from "axios";
import { Eye, PenSquare } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

type UserImageProps = {
  user: User;
  userSession?: User;
};

export default function UserImage({ user, userSession }: UserImageProps) {
  const { toast } = useToast();

  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const [image, setImage] = useState<File>();

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!image) return;

    setIsLoading(true);

    try {
      const formData = new FormData();
      formData.set("image", image);

      await axios.post(`/api/upload-image?userId=${user.id}`, formData);

      toast({
        title: "Success",
        description: "Your profile image updated successfully",
        variant: "success",
      });

      router.refresh();
      setIsPopupOpen(false);
    } catch (error: any) {
      const message = error?.response?.data?.message;

      toast({
        title: "Error",
        description: message || "Couldn't upload image",
        variant: "destructive",
      });
    }

    setIsLoading(false);
  }

  return (
    <div className="relative h-[150px] w-[150px] rounded-full bg-white/10">
      <div className="group h-full w-full">
        <Image
          src={user.avatar || "/images/avatar.png"}
          alt="User Profile image"
          width={500}
          height={500}
          quality={100}
          className="h-full w-full cursor-pointer rounded-full object-cover"
        />
        <Dialog>
          <DialogTrigger asChild>
            <Button
              aria-label="view profile image"
              variant="link"
              size="sm"
              className="pointer-events-none absolute inset-0 flex h-full w-full items-center justify-center rounded-full bg-input/60 text-primary opacity-0 transition-opacity duration-300 group-hover:pointer-events-auto group-hover:opacity-100"
            >
              <Eye size={20} />
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogTitle>{user.name}&lsquo;s image</DialogTitle>
            <Image
              src={user.avatar || "/images/avatar.png"}
              alt="User Profile image"
              width={500}
              height={500}
              quality={100}
              className="mx-auto mt-4 aspect-square h-[400px] w-[400px] rounded-full object-cover"
            />
          </DialogContent>
        </Dialog>
      </div>

      {userSession?.moderator && userSession?.id === user?.id && (
        <Dialog>
          <DialogTrigger asChild onClick={() => setIsPopupOpen(true)}>
            <Button
              aria-label="update profile image"
              variant="ghost"
              size="sm"
              className="absolute bottom-0 right-0 text-primary hover:bg-primary hover:text-white"
            >
              <PenSquare size={20} />
            </Button>
          </DialogTrigger>
          {isPopupOpen && (
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
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
                  type="file"
                  id="image"
                  disabled={isLoading}
                  name="image"
                  accept=".png, .jpg, .jpeg"
                  className="cursor-pointer"
                  onChange={(e) => setImage(e.target.files?.[0])}
                />
                <Button disabled={isLoading} className="ml-auto">
                  {isLoading ? "Saving..." : "Save changes"}
                </Button>
              </form>
            </DialogContent>
          )}
        </Dialog>
      )}
    </div>
  );
}
