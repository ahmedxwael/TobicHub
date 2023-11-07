"use client";

import { usePathname } from "next/navigation";
import { Badge } from "./ui/badge";

type CardBadgeProps = {
  isValid: boolean;
  validLabel: string;
  inValidLabel: string;
  danger?: boolean;
};

export default function CardBadge({
  isValid,
  inValidLabel,
  validLabel,
  danger,
}: CardBadgeProps) {
  const pathname = usePathname();

  return (
    pathname.includes("dashboard") && (
      <Badge
        variant={isValid ? "default" : danger ? "destructive" : "secondary"}
      >
        {isValid ? validLabel : inValidLabel}
      </Badge>
    )
  );
}
