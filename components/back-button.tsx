"use client";

import { Link, MoveLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";

export default function BackButton() {
  const router = useRouter();

  return (
    <Button
      variant="outline"
      onClick={router.back}
      className="mb-14 flex w-fit items-center gap-3 text-sm"
    >
      <MoveLeft size={20} />
      Back
    </Button>
  );
}
