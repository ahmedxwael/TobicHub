import FeaturesList from "@/components/features/features-list";
import SectionHeading from "@/components/section-heading";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";

const Home = () => {
  return (
    <>
      <section className="text-center">
        <h1 className="mb-4 text-3xl font-bold leading-normal text-primary sm:text-5xl">
          Welcome to TopicHub!
        </h1>
        <p className="text-muted-foreground sm:text-lg">
          Empower Your Ideas with Engaging Topics
        </p>
      </section>

      <section className="mt-20 w-full">
        <SectionHeading>Features</SectionHeading>
        <FeaturesList />
      </section>

      <section className="mt-20 text-center">
        <h2 className="mb-6 text-xl font-bold">Ready to get started?</h2>

        <Link href="/register" className={cn(buttonVariants({ size: "lg" }))}>
          Join us now
        </Link>
      </section>
    </>
  );
};

export default Home;
