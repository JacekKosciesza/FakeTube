"use client";

import CssBaseline from "@mui/material/CssBaseline";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import { ThemeProvider } from "@mui/material/styles";

import theme from "./theme";

export function Providers({
  children,
  deviceType,
}: Readonly<{
  children: React.ReactNode;
  deviceType: string;
}>) {
  return (
    <AppRouterCacheProvider>
      <ThemeProvider theme={theme(deviceType)}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </AppRouterCacheProvider>
  );
}
