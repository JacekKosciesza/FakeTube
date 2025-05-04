"use client";

import * as React from "react";

import { AppDrawer } from "./AppDrawer";
import { Masthead } from "./Masthead";
import { useNavigation } from "./useNavigation";

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

  const navigation = useNavigation(isAppDrawerOpened);

  return (
    <>
      <Masthead onGuideButtonClick={toggleAppDrawer} />
      {navigation.guide && (
        <AppDrawer
          open={isAppDrawerOpened}
          onDrawerClose={closeAppDrawer}
          variant={navigation.variant}
        />
      )}
      {children}
    </>
  );
}
