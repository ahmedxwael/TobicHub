import { cn } from "@/lib/utils";
import Image from "next/image";

type UserAvatarProps = {
  image: string;
  className?: string;
};

export default function UserAvatar({
  image,
  className,
  ...props
}: UserAvatarProps) {
  return (
    <Image
      {...props}
      priority
      src={image || "/images/avatar.png"}
      alt="user"
      width={500}
      height={500}
      className={cn(
        "h-12 w-12 shrink-0 rounded-full border border-muted/50 bg-muted object-cover",
        className
      )}
    />
  );
}
