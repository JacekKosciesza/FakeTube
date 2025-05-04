"use client";

import { createTheme } from "@mui/material/styles";

declare module "@mui/material/styles" {
  interface BreakpointOverrides {
    xxl: true;
    xxxl: true;
  }
}

const theme = createTheme({
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
