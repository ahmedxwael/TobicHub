"use client";

import { getTopicsAction } from "@/actions/actions";
import NoData from "@/components/no-data";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { debounce } from "@/utils/utils";
import { Topic } from "@prisma/client";
import { Search } from "lucide-react";
import { ChangeEvent, useState } from "react";
import SearchItem from "./search-item";
import SearchItemSkeleton from "./skeletons/search-item-skeleton";

type SearchTopicProps = {
  unapproved?: boolean;
  userId?: string;
};

export default function SearchTopic({ unapproved, userId }: SearchTopicProps) {
  const [topics, setTopics] = useState<Topic[]>([]);

  const [isLoading, setIsLoading] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handleInputChange = debounce(
    async (e: ChangeEvent<HTMLInputElement>) => {
      const searchValue = e.target.value.trim();

      if (!searchValue) {
        setTopics([]);
        return;
      }

      setIsLoading(true);
      const topicsList = await getTopicsAction({
        query: searchValue,
        where: { approved: unapproved ? undefined : true, authorId: userId },
      });

      setTopics(topicsList || []);
      setIsLoading(false);
    }
  );

  return (
    <Dialog
      open={isPopupOpen}
      onOpenChange={(open) => {
        setIsPopupOpen(open);
        setTopics([]);
      }}
    >
      <DialogTrigger asChild onClick={() => setIsPopupOpen(true)}>
        <Button aria-label="search" variant="ghost" className="ml-auto text-xl">
          <Search size={20} />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Search for topic</DialogTitle>
        </DialogHeader>
        <div className="flex-1 space-y-3">
          <label htmlFor="search">Topic</label>
          <Input
            autoComplete="off"
            id="search"
            type="text"
            required
            placeholder="Search for a specific topic"
            onChange={handleInputChange}
          />
        </div>
        <Separator className="my-4" />
        <DialogFooter>
          <ScrollArea className="max-h-[300px] w-full">
            {isLoading ? (
              <SearchItemSkeleton />
            ) : topics.length > 0 ? (
              <div className="flex flex-col gap-5">
                {topics.map((topic) => (
                  <SearchItem key={topic.id} topic={topic} />
                ))}
              </div>
            ) : (
              <NoData message="No topics found." />
            )}
          </ScrollArea>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
