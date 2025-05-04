"use client";

import mediaQuery from "css-mediaquery";
import { createTheme } from "@mui/material/styles";

declare module "@mui/material/styles" {
  interface BreakpointOverrides {
    xxl: true;
    xxxl: true;
  }
}

function deviceTypeToWidth(deviceType: string) {
  switch (deviceType) {
    case "mobile":
      return "600px";
    case "tablet":
      return "792px";
    default:
      return "1313px";
  }
}

const ssrMatchMedia = (deviceType: string) => (query: string) => ({
  matches: mediaQuery.match(query, {
    width: deviceTypeToWidth(deviceType),
  }),
});

const theme = (deviceType: string) =>
  createTheme({
    typography: {
      fontFamily: "var(--font-roboto)",
    },
    breakpoints: {
      values: {
        xs: 0,
        sm: 601,
        md: 792,
        lg: 1313,
        xl: 1536,
        xxl: 1920,
        xxxl: 2985,
      },
    },
    components: {
      MuiUseMediaQuery: {
        defaultProps: {
          ssrMatchMedia: ssrMatchMedia(deviceType),
        },
      },
      MuiAppBar: {
        styleOverrides: {
          colorPrimary: {
            backgroundColor: "#FFFFFF",
            color: "#000000",
          },
        },
      },
    },
  });

export default theme;
