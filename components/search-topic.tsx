"use client";

import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Input } from "./ui/input";

type Inputs = {
  search: string;
};

const SearchTopic = () => {
  const router = useRouter();

  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = ({ search }) => {
    const encodedQueryString = encodeURI(search);

    router.push(`/search?q=${encodedQueryString}`);
    setIsPopupOpen(false);
  };

  return (
    <Dialog>
      <DialogTrigger asChild onClick={() => setIsPopupOpen(true)}>
        <Button
          size="sm"
          variant="outline"
          className="default-shadow text-xl transition-transform hover:scale-105 hover:text-primary"
        >
          <Search size={20} />
        </Button>
      </DialogTrigger>
      {isPopupOpen && (
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Search for topic</DialogTitle>
          </DialogHeader>
          <form
            className="mt-4 flex flex-col gap-y-4"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="space-y-3">
              <label htmlFor="search">Topic</label>
              <Input
                id="search"
                type="text"
                {...register("search", {
                  required: "You have to write something to search.",
                })}
                placeholder="Search for a specific topic"
                className="mt-3"
              />
            </div>
            {errors.search && (
              <span className="inline-block text-sm text-red-500">
                {errors.search.message}
              </span>
            )}
            <Button size="lg" className="ml-auto">
              Search
            </Button>
          </form>
        </DialogContent>
      )}
    </Dialog>
  );
};

export default SearchTopic;
