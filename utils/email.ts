import { toast } from "@/components/ui/use-toast";
import { EmailRequestBodyType } from "@/emails/types";
import axios from "axios";

export async function sendEmail(body: EmailRequestBodyType, awaited = false) {
  awaited
    ? await axios.post("/api/send", body).catch((error) => {
        toast({ variant: "destructive", title: "Couldn't send email" });
      })
    : axios.post("/api/send", body).catch((error) => {
        toast({ variant: "destructive", title: "Couldn't send email" });
      });
}
