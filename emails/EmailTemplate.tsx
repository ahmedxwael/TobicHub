import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  Section,
  Tailwind,
  Text,
} from "@react-email/components";
import * as React from "react";

type EmailTemplateProps = {
  subject: string;
  sender: string;
};

export default function EmailTemplate({ sender, subject }: EmailTemplateProps) {
  return (
    <Html>
      <Head />
      <Preview>New message from TopicHub</Preview>
      <Tailwind>
        <Body className="bg-muted-foreground text-black">
          <Container>
            <Section className="my-10 rounded-md border bg-white px-10 py-4">
              <Heading className="leading-tight">
                You received a new message from TopicHub
              </Heading>
              <Text className="text-input">{subject}</Text>
              <Hr />
              <Text>Sender: {sender}</Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}
