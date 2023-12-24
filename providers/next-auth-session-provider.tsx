"use client";

import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";

type NexAuthSessionProviderProps = {
  children: ReactNode;
  session: any;
};

const NexAuthSessionProvider = ({
  children,
  session,
}: NexAuthSessionProviderProps) => {
  return <SessionProvider session={session}>{children}</SessionProvider>;
};

export default NexAuthSessionProvider;
