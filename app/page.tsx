import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { HeroSection } from "@/modules/home/sections/hero-section";
import { KeyFeaturesSection } from "@/modules/home/sections/key-features-section";
import { WhyToChooseUsSection } from "@/modules/home/sections/why-to-choose-us-section";
import { urls } from "@/shared/urls";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { authOptions } from "./api/auth/options";

export default async function HomePage() {
  const session = await getServerSession(authOptions);

  return (
    <div className="flex flex-col items-center">
      <HeroSection user={session?.user as any} />
      <WhyToChooseUsSection />
      <KeyFeaturesSection />
      <section className="w-full bg-background py-20 text-center">
        <h2 className="mb-8 text-3xl font-bold">Ready to dive in?</h2>
        <Link
          href={session?.user ? urls.topics.list : urls.register}
          className={cn(buttonVariants({ size: "lg" }), "px-8 py-3 text-xl")}
        >
          {session?.user ? "Explore Topics" : "Join TopicHub Now"}
        </Link>
      </section>
    </div>
  );
}
