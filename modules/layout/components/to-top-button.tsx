"use client";

import { Button } from "@/components/ui/button";
import { ChevronUp } from "lucide-react";

export default function ToTopButton() {
  function handleScrollToTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <Button
      variant="ghost"
      size="sm"
      aria-label="to top button"
      className="fixed bottom-6 right-6 z-20 w-fit p-2"
      onClick={handleScrollToTop}
    >
      <ChevronUp size={20} />
    </Button>
  );
}
