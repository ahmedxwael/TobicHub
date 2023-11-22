import { Loader2 } from "lucide-react";

const loading = () => {
  return (
    <section className="flex min-h-[calc(100vh-117px-12rem)] items-center justify-center sm:min-h-[calc(100vh-76.8px-12rem)]">
      <span className="animate-spin text-3xl text-primary">
        <Loader2 size={30} />
      </span>
    </section>
  );
};

export default loading;
