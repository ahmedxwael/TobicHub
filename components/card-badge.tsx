"use client";

import { usePathname } from "next/navigation";
import { Badge } from "./ui/badge";

type CardBadgeProps = {
  isValid: boolean;
  validLabel: string;
  inValidLabel: string;
  danger?: boolean;
  isMaster?: boolean;
  masterLabel?: string;
};

export default function CardBadge({
  isValid,
  inValidLabel,
  validLabel,
  danger,
  isMaster,
  masterLabel,
}: CardBadgeProps) {
  const pathname = usePathname();

  return (
    pathname.includes("dashboard") &&
    (isMaster ? (
      <Badge variant="destructive">{masterLabel}</Badge>
    ) : (
      <Badge
        variant={isValid ? "default" : danger ? "destructive" : "secondary"}
      >
        {isValid ? validLabel : inValidLabel}
      </Badge>
    ))
  );
}
