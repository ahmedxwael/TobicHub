import ContactUsForm from "@/modules/contact-us/components/contact-us-form";
import Image from "next/image";

export default function ContactUsPage() {
  return (
    <section className="container flex w-full py-20">
      <div className="relative hidden min-h-[700px] flex-1 overflow-hidden rounded-xl lg:block">
        <Image
          src="/images/contact-us-unsplash.jpg"
          priority={true}
          width={1000}
          height={1000}
          alt="contact-us image"
          className="absolute left-0 top-0 z-10 h-full w-full border-0 object-cover"
        />
        <span className="inline-block h-full w-full animate-pulse bg-muted" />
        <span className="absolute bottom-0 left-0 z-10 h-full w-full bg-gradient-to-t from-background/70 to-transparent to-40%" />
      </div>
      <div className="relative flex w-full flex-1 items-center justify-center lg:p-8">
        <ContactUsForm />
      </div>
    </section>
  );
}
