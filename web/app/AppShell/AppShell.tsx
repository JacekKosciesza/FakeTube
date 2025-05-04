"use client";

import * as React from "react";

import { AppDrawer } from "./AppDrawer";
import { Masthead } from "./Masthead";
import { MiniGuide } from "./MiniGuide";
import { PageManager } from "./PageManager";
import { PivotBar } from "./PivotBar";
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
      <Masthead
        onGuideButtonClick={toggleAppDrawer}
        showGuideButton={!navigation.pivotBar}
      />
      {navigation.pivotBar && <PivotBar />}
      {navigation.miniGuide && <MiniGuide />}
      {navigation.guide && (
        <AppDrawer
          open={isAppDrawerOpened}
          onDrawerClose={closeAppDrawer}
          variant={navigation.variant}
        />
      )}
      <PageManager navigation={navigation}>{children}</PageManager>
    </>
  );
}
