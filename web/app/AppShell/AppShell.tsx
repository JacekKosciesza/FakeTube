import * as React from "react";

import { Masthead } from "./Masthead";

interface Props {
  children: React.ReactNode;
}

export function AppShell({ children }: Props) {
  return (
    <>
      <Masthead />
      {children}
    </>
  );
}
