"use client";

import * as React from "react";

import { AppDrawer } from "./AppDrawer";
import { Masthead } from "./Masthead";

interface Props {
  children: React.ReactNode;
}

export function AppShell({ children }: Props) {
  const [isAppDrawerOpened, setIsAppDrawerOpened] = React.useState(false);

  const closeAppDrawer = () => {
    setIsAppDrawerOpened(false);
  };
  const toggleAppDrawer = () => {
    setIsAppDrawerOpened(!isAppDrawerOpened);
  };

  return (
    <>
      <Masthead onGuideButtonClick={toggleAppDrawer} />
      <AppDrawer
        open={isAppDrawerOpened}
        onDrawerClose={closeAppDrawer}
        variant="temporary"
      />
      {children}
    </>
  );
}
