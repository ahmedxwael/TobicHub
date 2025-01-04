/* eslint-disable prettier/prettier */
import { Resource } from "@/app/dashboard/components/add-topic";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { getShortenURL, validateURL } from "@/utils/utils";
import { CheckIcon, XIcon } from "lucide-react";
import { ChangeEvent } from "react";

type TopicResourceFieldProps = {
  resource: Resource;
  resources: Resource[];
  setResources: (resources: Resource[]) => void;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  index: number;
};

export default function TopicResourceField({
  resource,
  resources,
  setResources,
  index,
}: TopicResourceFieldProps) {
  const { toast } = useToast();

  return (
    <div className="flex items-center gap-2">
      <Input
        type="url"
        placeholder="https://example.com"
        required
        value={resource.resource}
        onChange={(e) => {
          const updatedResources: Resource[] = [...resources];
          updatedResources[index] = {
            resource: e.target.value,
            approved: false,
          };
          setResources(updatedResources);
        }}
      />
      {!resource.approved && (
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={async () => {
            const isValidUrl = validateURL(resource.resource);

            if (!isValidUrl || !resource.resource.trim()) {
              toast({
                title: "Something went wrong.",
                description: "Invalid URL.",
                variant: "destructive",
              });

              return;
            }

            const shortenedResourceObj = {
              resource: await getShortenURL(resource.resource),
              approved: true,
            };

            const storedResources = resources.filter(
              (storedResource) => storedResource.resource !== resource.resource
            );

            setResources([...storedResources, shortenedResourceObj]);
          }}
        >
          <CheckIcon />
        </Button>
      )}
      <Button
        type="button"
        variant="destructive"
        size="sm"
        onClick={() => {
          const updatedResources = [...resources];
          updatedResources.splice(index, 1);
          setResources(updatedResources);
        }}
      >
        <XIcon />
      </Button>
    </div>
  );
}
