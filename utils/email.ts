import { EmailRequestBodyType } from "@/emails/types";
import axios from "axios";

export async function sendEmail(body: EmailRequestBodyType, awaited = false) {
  awaited
    ? await axios.post("/api/send", body).catch(() => {
        throw new Error("Something went wrong.");
      })
    : axios.post("/api/send", body).catch((error) => {
        throw new Error("Something went wrong.");
      });
}
