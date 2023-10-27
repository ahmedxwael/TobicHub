import BackButton from "@/components/back-button";
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
      <BackButton />
      <TopicsSection title={`Results for ${q}`} query={q} type="search" />
    </section>
  );
};

export default SearchPage;
