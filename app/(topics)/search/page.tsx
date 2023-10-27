import TopicsSection from "@/components/topics/topics-section";
import { MoveLeft } from "lucide-react";
import Link from "next/link";
import React from "react";

type Props = {
  searchParams: { q: string };
};

const SearchPage = async ({ searchParams: { q } }: Props) => {
  return (
    <section className="flex flex-col gap-8">
      <Link href="/topics" className="mb-8 flex items-center gap-3 text-base">
        <MoveLeft />
        Back
      </Link>
      <TopicsSection title={`Results for ${q}`} query={q} />
    </section>
  );
};

export default SearchPage;
