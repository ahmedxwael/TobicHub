import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Topic } from "@/modules/topics/types";
import { Eye } from "lucide-react";

type ViewTopicProps = {
  topic: Topic;
};

export default function ViewTopic({ topic }: ViewTopicProps) {
  return (
    <Dialog>
      <DialogTrigger asChild className="w-full">
        <Button variant="ghost" className="h-fit w-fit p-2">
          <Eye size={20} />
        </Button>
      </DialogTrigger>
      <DialogContent className="space-y-2">
        <DialogHeader className="space-y-1">
          <div className="flex flex-col">
            <div className="line-clamp-3 text-xl font-semibold capitalize">
              {topic.title}
            </div>
            <div className="text-sm text-muted-foreground">
              {topic.updatedAt.toDateString()}
            </div>
          </div>
        </DialogHeader>
        <DialogDescription className="max-h-[300px] overflow-auto text-justify text-base leading-normal">
          {topic.description}
        </DialogDescription>
      </DialogContent>
    </Dialog>
  );
}
