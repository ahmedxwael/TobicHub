import SectionHeading from "@/components/section-heading";
import { Feature, whyToChooseUsFeatures } from "../utils/data";

export function WhyToChooseUsSection() {
  return (
    <section className="w-full bg-background py-20">
      <div className="container mx-auto">
        <SectionHeading>Why Choose TopicHub?</SectionHeading>
        <div className="mt-10 grid grid-cols-1 gap-10 md:grid-cols-3">
          {whyToChooseUsFeatures.map((feature, index) => (
            <FeatureItem key={index} {...feature} />
          ))}
        </div>
      </div>
    </section>
  );
}

const FeatureItem = ({ title, description, icon: Icon }: Feature) => (
  <div className="flex flex-col items-center rounded-lg bg-muted/20 p-6 text-center shadow-md transition-all duration-300 hover:shadow-xl">
    <Icon className="mb-4 text-4xl text-primary" />
    <h3 className="mb-4 text-2xl font-semibold">{title}</h3>
    <p className="text-muted-foreground">{description}</p>
  </div>
);
