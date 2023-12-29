import { Badge } from "./ui/badge";

type CardBadgeProps = {
  isPrimary?: boolean;
  label: string;
  isDestructive?: boolean;
};

export default function CardBadge({
  isPrimary,
  label,
  isDestructive,
}: CardBadgeProps) {
  return (
    <Badge
      variant={
        isPrimary ? "default" : isDestructive ? "destructive" : "secondary"
      }
    >
      {label}
    </Badge>
  );
}
