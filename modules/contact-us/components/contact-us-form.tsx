"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { sendContactMessage } from "@/utils/contact-utils";
import { CheckCircle2 } from "lucide-react";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

type InputsType = {
  name: string;
  email: string;
  message: string;
};

export default function ContactUsForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<InputsType>();

  const { toast } = useToast();

  const [isMessageSent, setIsMessageSent] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit: SubmitHandler<InputsType> = async (formData) => {
    setIsSubmitting(true);

    try {
      await sendContactMessage(formData);

      toast({
        title: "Your message has been sent successfully.",
        description:
          "Thanks for contacting with us, We will contact you as possible.",
        variant: "success",
      });

      setIsMessageSent(true);
      setIsSubmitting(false);
      reset();
    } catch (error: any) {
      toast({
        title: "Something went wrong",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  return isMessageSent ? (
    <div className="space-y-2">
      <CheckCircle2 size={80} className="mx-auto mb-8 text-primary" />
      <h1 className="text-center text-2xl font-bold capitalize">
        Your message sent successfully
      </h1>
      <p className="text-center text-muted-foreground">
        Thanks for contacting with us, We will contact you as possible.
      </p>
    </div>
  ) : (
    <div className="mx-auto flex w-[500px] max-w-full flex-col justify-center space-y-10 p-6">
      <div className="flex flex-col space-y-2">
        <h1 className="text-2xl font-semibold capitalize tracking-tight">
          Contact us
        </h1>
        <p className="text-sm text-muted-foreground">
          Enter your information below and start contacting with us.
        </p>
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex max-w-full flex-col gap-6"
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
        <Button
          disabled={isSubmitting}
          size="lg"
          className="ml-auto capitalize"
        >
          {isSubmitting ? "submitting..." : "submit"}
        </Button>
      </form>{" "}
    </div>
  );
}
