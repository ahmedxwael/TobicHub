"use client";

import CustomAlertDialog from "@/components/custom-alert-dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { deleteContactMessage } from "@/utils/contact-utils";
import { MoreHorizontal } from "lucide-react";
import { ButtonHTMLAttributes, HTMLAttributes, useState } from "react";
import { Contact } from "../types";

type ContactCardProps = {
  contact: Contact;
};

export default function ContactCard({ contact }: ContactCardProps) {
  return (
    <Dialog>
      <DialogTrigger asChild className="w-full">
        <Card className="relative cursor-pointer">
          <CardContent className="p-4">
            <div>
              <div className="text-lg font-medium capitalize">
                {contact.name}
              </div>
              <div className="text-sm text-muted-foreground">
                {contact.email}
              </div>
            </div>
            <p className="my-4 line-clamp-1">{contact.message}</p>
          </CardContent>
          <ContactOptions contact={contact} />
        </Card>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader className="space-y-1">
          <div className="text-lg font-medium capitalize">{contact.name}</div>
          <div className="text-sm text-muted-foreground">{contact.email}</div>
        </DialogHeader>
        <DialogDescription className="max-h-[300px] overflow-auto text-base leading-normal">
          {contact.message}
        </DialogDescription>
      </DialogContent>
    </Dialog>
  );
}

type ContactOptionsProps = {
  contact: Contact;
} & ButtonHTMLAttributes<HTMLButtonElement>;

async function ContactOptions({ className, contact }: ContactOptionsProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleContactDelete = async () => {
    setIsLoading(true);
    await deleteContactMessage(contact.id);
    setIsLoading(false);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          onClick={(e) => {
            e.stopPropagation();
            setIsDropdownOpen(true);
          }}
          className={cn("absolute right-4 top-4 h-fit w-fit px-2", className)}
          variant="outline"
          aria-label="options"
        >
          <MoreHorizontal size={15} />
        </Button>
      </DropdownMenuTrigger>
      {isDropdownOpen && (
        <DropdownMenuContent
          align="end"
          className="w-[170px]"
          onClick={(e) => e.stopPropagation()}
        >
          <CustomAlertDialog
            action={handleContactDelete}
            title="Delete"
            variant="ghost"
            description="This action cannot be undone. Are you sure that you want to delete this topic?"
            className="text-red-600 hover:bg-red-600 hover:text-white"
            disabled={isLoading}
          />
        </DropdownMenuContent>
      )}
    </DropdownMenu>
  );
}
