"use client";

import * as React from "react";
import Chip from "@mui/material/Chip";
import { Duration } from "luxon";

interface Props {
  time: string;
}

export function TimeStatus({ time }: Props) {
  const duration: string = React.useMemo(() => {
    const seconds = Duration.fromISO(time).as("seconds");
    return Duration.fromObject({ seconds: Math.ceil(seconds) }).toFormat(
      "m:ss"
    );
  }, [time]);

  return (
    <Chip
      size="small"
      label={duration}
      sx={{
        position: "absolute",
        bottom: (theme) => theme.spacing(1.5),
        right: (theme) => theme.spacing(1),
        borderRadius: 1,
        color: "white",
        fontWeight: 600,
        backgroundColor: "#00000099",
        ".MuiChip-label": {
          padding: 0.5,
        },
      }}
    />
  );
}
