import Link from "next/link";

type NotFoundProps = {
  message: string;
};

export default function NotFound({ message }: NotFoundProps) {
  return (
    <section className="flex min-h-[calc(100vh-200px)] flex-col items-center justify-center gap-6 text-center">
      <h2 className="text-xl font-bold lg:text-2xl">Something happened.</h2>
      <p className="text-muted-foreground">{message}</p>
      <div className="flex gap-4">
        <Link href="/" className="btn btn-primary">
          Back to home
        </Link>
      </div>
    </section>
  );
}
