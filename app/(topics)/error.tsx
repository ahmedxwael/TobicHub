"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const router = useRouter();

  return (
    <section className="flex flex-col items-center justify-center gap-6">
      <h2>Something went wrong!</h2>
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
        <Link href="/" className="btn btn-primary">
          Back to home
        </Link>
      </div>
    </section>
  );
}
