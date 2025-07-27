"use client";

import * as React from "react";
import Box from "@mui/material/Box";

import { Video } from "../video";
import { VideoDetails } from "./VideoDetails";
import { VideoPlayer } from "./VideoPlayer";
import { VideoThumbnail } from "./VideoThumbnail";

interface Props {
  video: Video;
}

export function MediaItem({ video }: Props) {
  const [isHovered, setIsHovered] = React.useState(false);

  const [isMuted, setIsMuted] = React.useState(true);
  const toggleMute = React.useCallback(() => {
    setIsMuted((prev) => !prev);
  }, []);

  return (
    <Box
      sx={{
        width: "100%",
        mb: 2,
        display: "block",
        aspectRatio: "16 / 9",
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {isHovered ? (
        <VideoPlayer video={video} isMuted={isMuted} toggleMute={toggleMute} />
      ) : (
        <VideoThumbnail video={video} />
      )}
      <VideoDetails video={video} />
    </Box>
  );
}
