"use client";

import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import { DateTime } from "luxon";

import { Video } from "../../video";

interface Props {
  video: Video;
}

export function VideoDetails({ video }: Props) {
  const date: string | null = React.useMemo(
    () =>
      DateTime.fromISO(video.publishedAt).toRelative({
        unit: ["years", "months", "weeks", "days"],
      }),
    [video.publishedAt]
  );

  return (
    <Box sx={{ display: "flex", alignItems: "flex-start" }}>
      <Avatar
        src={video.channel.avatar}
        alt={video.channel.name}
        sx={{
          width: (theme) => theme.spacing(4.5),
          height: (theme) => theme.spacing(4.5),
          marginRight: (theme) => theme.spacing(1),
        }}
      />
      <Stack>
        <Typography
          variant="subtitle2"
          component="h3"
          fontSize={16}
          gutterBottom
          mb={0.5}
        >
          {video.title}
        </Typography>
        <Stack>
          <Tooltip
            title={video.channel.name}
            placement="top"
            disableInteractive
          >
            <Typography
              variant="caption"
              fontSize={14}
              sx={{
                color: "#606060",
                "&:hover": {
                  color: (theme) => theme.palette.text.primary,
                },
              }}
            >
              {video.channel.name}
            </Typography>
          </Tooltip>
        </Stack>

        <Typography
          variant="caption"
          fontSize={14}
          sx={{
            color: "#606060",
          }}
        >
          {date}
        </Typography>
      </Stack>
    </Box>
  );
}
