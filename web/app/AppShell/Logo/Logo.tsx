"use client";

import * as React from "react";
import Image from "next/image";
import NextLink from "next/link";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";

export function Logo() {
  return (
    <Tooltip
      title="FakeTube Home"
      enterDelay={500}
      disableInteractive
      sx={{
        textDecoration: "none",
      }}
    >
      <NextLink href="/" style={{ textDecoration: "none" }}>
        <Stack direction="row" alignItems="center" spacing={0.2}>
          <Image src="faketube.svg" alt="" width={29} height={20} />
          <Typography
            variant="h6"
            color="textPrimary"
            sx={{
              fontWeight: (theme) => theme.typography.fontWeightBold,
              letterSpacing: "-0.075rem",
            }}
          >
            FakeTube
          </Typography>
        </Stack>
      </NextLink>
    </Tooltip>
  );
}
