import SectionHeading from "@/components/section-heading";
import { Feature, keyFeatures } from "../utils/data";

export function KeyFeaturesSection() {
  return (
    <section className="w-full max-w-[1500px] rounded-[30px] bg-muted/20 py-10">
      <div className="container mx-auto">
        <SectionHeading className="text-primary md:text-3xl">
          Key Features
        </SectionHeading>

        <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {keyFeatures.map((feature, index) => (
            <KeyFeatureItem key={index} {...feature} />
          ))}
        </div>
      </div>
    </section>
  );
}

function KeyFeatureItem({ title, description, icon: Icon }: Feature) {
  return (
    <div className="group relative overflow-hidden rounded-xl bg-muted/50 p-6 shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl">
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary text-white">
        <Icon className="h-6 w-6" />
      </div>
      <h3 className="mb-2 text-xl font-semibold text-primary">{title}</h3>
      <p className="text-sm text-muted-foreground">{description}</p>
      <div className="absolute -bottom-12 -right-12 h-24 w-24 rounded-full bg-primary/10 transition-all duration-300 group-hover:scale-150"></div>
    </div>
  );
}
