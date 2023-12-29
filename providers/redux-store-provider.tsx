"use client";

import { store } from "@/lib/redux-store/store";
import React from "react";
import { Provider } from "react-redux";

type ReduxStoreProviderProps = {
  children: React.ReactNode;
};

export default function ReduxStoreProvider({
  children,
}: ReduxStoreProviderProps) {
  return <Provider store={store}>{children}</Provider>;
}
