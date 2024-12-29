import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { urls } from "@/shared/urls";
import Link from "next/link";
import React from "react";

export default function PrivacyPolicyPage() {
  return (
    <section className="w-full">
      <div className="prose w-screen max-w-full prose-headings:mb-2 prose-headings:text-foreground prose-p:text-muted-foreground">
        <h1>Privacy Policy for TopicHub</h1>
        <h2>1. Introduction</h2>
        <p>
          Welcome to TopicHub. We are committed to protecting the privacy and
          security of your personal information. This Privacy Policy outlines
          the types of personal information we collect, how we use and protect
          this information, and your rights concerning this information.
        </p>
        <h2>2. Information We Collect</h2>
        <p>
          Personal Information: We may collect personal information such as your
          name, username and email address when you interact with our website or
          services.
        </p>
        <h2>3. How We Use Your Information</h2>
        <p>
          We use your information for the following purposes: To communicate
          with you regarding your posts state and updates.
        </p>
        <h2>4. Sharing Your Information</h2>
        <p>
          We do not sell, trade, or rent your personal information to third
          parties.
        </p>
        <h2>5. Security</h2>
        <p>
          We take appropriate measures to protect your personal information.
          However, no method of transmission over the internet or electronic
          storage is entirely secure.
        </p>
        <h2>6. Contact Us</h2>
        <p>
          If you have any questions about this Privacy Policy or your personal
          information, please contact us at Contact us page.{" "}
          <Link
            href={urls.contactUs}
            className={cn(buttonVariants({ variant: "link" }))}
          >
            Contact us
          </Link>
        </p>
      </div>
    </section>
  );
}
