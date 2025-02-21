import { cn } from "@/lib/utils";
import { Badge } from "./ui/badge";

type CardBadgeProps = {
  isPrimary?: boolean;
  label: string;
  isDestructive?: boolean;
  className?: string;
};

export default function CardBadge({
  isPrimary,
  label,
  isDestructive,
  className,
}: CardBadgeProps) {
  return (
    <Badge
      variant={
        isPrimary ? "default" : isDestructive ? "destructive" : "secondary"
      }
      className={cn(className)}
    >
      {label}
    </Badge>
  );
}
