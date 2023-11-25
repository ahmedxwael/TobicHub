"use client";

import { Button } from "@/components/ui/button";
import { ChevronUp } from "lucide-react";

export default function ToTopButton() {
  function handleScrollToTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <Button
      variant="outline"
      size="sm"
      aria-label="to top button"
      className="default-shadow fixed bottom-6 right-6 z-20 w-fit p-2 hover:text-primary"
      onClick={handleScrollToTop}
    >
      <ChevronUp size={20} />
    </Button>
  );
}
