"use client";

import { MoveLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";

export default function BackButton() {
  const router = useRouter();

  return (
    <Button
      variant="link"
      onClick={router.back}
      className="mb-14 flex w-fit items-center  gap-3 p-0 text-sm text-primary-foreground hover:text-primary"
    >
      <MoveLeft size={20} />
      Back
    </Button>
  );
}
