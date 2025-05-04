import * as React from "react";

interface Props {
  children: React.ReactNode;
}

export function AppShell({ children }: Props) {
  return <>{children}</>;
}
