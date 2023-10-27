import { Loader2 } from "lucide-react";

const ComponentLoader = () => {
  return (
    <div className="flex items-center justify-center p-10">
      <span className="animate-spin text-3xl">
        <Loader2 size={30} />
      </span>
    </div>
  );
};

export default ComponentLoader;
