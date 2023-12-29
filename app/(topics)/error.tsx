"use client";

import { URLS } from "@/shared/urls";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <section className="flex flex-col items-center justify-center gap-6">
      <h2>Something went wrong!</h2>
      <p>{error.message}</p>
      <div className="flex gap-4">
        <button
          className="btn btn-alt"
          onClick={() => {
            reset();
            location.reload();
          }}
        >
          Try again
        </button>
        <Link href={URLS.home} className="btn btn-primary">
          Back to home
        </Link>
      </div>
    </section>
  );
}
