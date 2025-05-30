"use client";

import { cn } from "@/lib/utils";
import { RotateCw } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { useToast } from "./ui/use-toast";

type RefreshButtonProps = {
  className?: string;
};

export default function RefreshButton({ className }: RefreshButtonProps) {
  const router = useRouter();
  const { toast } = useToast();

  return (
    <Button
      variant="ghost"
      size="icon"
      className={cn(className)}
      onClick={() => {
        router.refresh();
        toast({ title: "Data updated successfully" });
      }}
    >
      <RotateCw size={20} />
    </Button>
  );
}
