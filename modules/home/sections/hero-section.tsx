import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { UserSessionType } from "@/modules/user/types";
import { urls } from "@/shared/urls";
import Image from "next/image";
import Link from "next/link";

type HeroSectionProps = {
  user?: UserSessionType;
};

export function HeroSection({ user }: HeroSectionProps) {
  return (
    <section className="relative flex min-h-[587px] w-full max-w-[1500px] items-center justify-center bg-background sm:min-h-[675px]">
      <span className="absolute inset-0 z-10 bg-gradient-to-t from-gray-900 to-muted/20"></span>
      <Image
        src="/images/hero-unsplash.jpg"
        alt="TopicHub Hero"
        layout="fill"
        objectFit="cover"
        className="absolute z-0"
      />
      <div className="container relative z-20 text-center text-white">
        <h1 className="mb-4 text-3xl font-bold leading-tight sm:text-6xl">
          Welcome to TopicHub
        </h1>
        <p className="mb-8 text-lg sm:text-2xl">
          Empower Your Ideas with Engaging Topics
        </p>
        <Link
          href={user ? urls.topics.list : urls.register}
          className={cn(buttonVariants({ size: "lg" }), "px-8 py-3 text-xl")}
        >
          {user ? "Go to Topics" : "Get Started"}
        </Link>
      </div>
    </section>
  );
}
