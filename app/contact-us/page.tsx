"use client";

import SectionHeading from "@/components/section-heading";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { EmailRequestBodyType } from "@/emails/types";
import { OWNER_EMAIL } from "@/shared/flags";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

type InputsType = {
  name: string;
  email: string;
  message: string;
};

export default function ContactUsPage() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<InputsType>();

  const router = useRouter();
  const { toast } = useToast();

  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit: SubmitHandler<InputsType> = async (formData) => {
    setIsSubmitting(true);

    try {
      const emailObject: EmailRequestBodyType = {
        sender: formData.email,
        receiver: OWNER_EMAIL!,
        subject: `${formData.name} wants to contact with you.`,
        message: formData.message,
      };

      toast({
        title: "Your message has been sent successfully.",
        description:
          "Thanks for contacting with us, We will contact you as possible.",
        variant: "success",
      });

      setIsSubmitting(false);
      router.push("/");
    } catch (error: any) {
      throw new Error("Something went wrong\n" + error.message);
    }
  };

  return (
    <section className="flex w-full flex-col">
      <SectionHeading>Contact Us</SectionHeading>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mx-auto flex w-[500px] max-w-full flex-col gap-6"
      >
        <div className="flex flex-col gap-3">
          <Label htmlFor="name" className="cursor-pointer">
            Name
          </Label>
          <Input
            autoFocus={true}
            type="text"
            id="name"
            placeholder="Your name"
            disabled={isSubmitting}
            {...register("name", {
              required: "Name is required.",
            })}
          />
          {errors.name && (
            <span className="inline-block text-sm text-red-500">
              {errors.name.message}
            </span>
          )}
        </div>
        <div className="flex flex-col gap-3">
          <Label htmlFor="email" className="cursor-pointer">
            Email
          </Label>
          <Input
            type="email"
            id="email"
            placeholder="Your email address"
            disabled={isSubmitting}
            {...register("email", {
              required: "Email is required.",
            })}
          />
          {errors.email && (
            <span className="inline-block text-sm text-red-500">
              {errors.email.message}
            </span>
          )}
        </div>
        <div className="flex flex-col gap-3">
          <Label htmlFor="message" className="cursor-pointer">
            Message
          </Label>
          <Textarea
            id="message"
            placeholder="What is this about...?"
            rows={10}
            disabled={isSubmitting}
            {...register("message", {
              required: "Message is required.",
            })}
          />
          {errors.message && (
            <span className="inline-block text-sm text-red-500">
              {errors.message.message}
            </span>
          )}
        </div>
        <div className="ml-auto flex gap-4">
          <Button
            disabled={isSubmitting}
            type="button"
            onClick={() => router.push("/")}
            variant="outline"
            size="lg"
          >
            Cancel
          </Button>
          <Button disabled={isSubmitting} size="lg" className="capitalize">
            {isSubmitting ? "submitting..." : "submit"}
          </Button>
        </div>
      </form>
    </section>
  );
}
