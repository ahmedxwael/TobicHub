import { EmailRequestBodyType } from "@/shared/types";
import axios from "axios";

export async function sendEmail(body: EmailRequestBodyType) {
  axios.post("/api/send", body).catch(() => {
    throw new Error("Something went wrong.");
  });
}
