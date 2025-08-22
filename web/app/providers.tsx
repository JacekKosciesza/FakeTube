"use client";

import CssBaseline from "@mui/material/CssBaseline";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import { ThemeProvider } from "@mui/material/styles";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import theme from "./theme";
import { ConfigureAmplifyClientSide } from "@/utils";

const queryClient = new QueryClient();

export function Providers({
  children,
  deviceType,
}: Readonly<{
  children: React.ReactNode;
  deviceType: string;
}>) {
  return (
    <ConfigureAmplifyClientSide>
      <AppRouterCacheProvider>
        <QueryClientProvider client={queryClient}>
          <ThemeProvider theme={theme(deviceType)}>
            <CssBaseline />
            {children}
          </ThemeProvider>
        </QueryClientProvider>
      </AppRouterCacheProvider>
    </ConfigureAmplifyClientSide>
  );
}
