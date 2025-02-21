import { cn } from "@/lib/utils";
import Image from "next/image";

type UserAvatarProps = {
  src: string;
  className?: string;
  alt?: string;
};

export default function UserAvatar({
  src,
  className,
  alt,
  ...props
}: UserAvatarProps) {
  return (
    <Image
      {...(props as any)}
      priority
      src={src || "/images/avatar.png"}
      alt={alt || "user"}
      width={500}
      height={500}
      className={cn(
        "h-12 w-12 shrink-0 rounded-full border border-muted/50 bg-muted object-cover",
        className
      )}
    />
  );
}
