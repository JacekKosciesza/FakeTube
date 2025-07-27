"use client";

import * as React from "react";
import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import VolumeOffIcon from "@mui/icons-material/VolumeOff";
import VolumeUpOutlinedIcon from "@mui/icons-material/VolumeUpOutlined";
import { Duration } from "luxon";
import { styled } from "@mui/material/styles";

import { Video } from "../../video";
import { TimeStatus } from "../TimeStatus";

interface Props {
  video: Pick<Video, "duration" | "url">;
  isMuted: boolean;
  toggleMute: () => void;
}

const StyledVideo = styled("video")({
  aspectRatio: "16 / 9",
  maxWidth: "100%",
  display: "block",
  objectFit: "cover",
});

export function VideoPlayer({ video, isMuted, toggleMute }: Props) {
  const [progress, setProgress] = React.useState(0);
  const [remainingDuration, setRemainingDuration] = React.useState(
    video.duration
  );

  const handleTimeUpdate = ({
    currentTarget: { currentTime, duration },
  }: React.SyntheticEvent<HTMLVideoElement>) => {
    updateProgressIndicator(currentTime, duration);
    updateRemainingDuration(currentTime);
  };

  const updateProgressIndicator = (currentTime: number, duration: number) => {
    const progressPercentage = (currentTime / duration) * 100;
    setProgress(progressPercentage);
  };

  const updateRemainingDuration = (currentTime: number) => {
    const totalDurationInSeconds = Duration.fromISO(video.duration).as(
      "seconds"
    );
    const remainingTimeInSeconds = totalDurationInSeconds - currentTime;

    setRemainingDuration(
      Duration.fromObject({ seconds: remainingTimeInSeconds }).toISO()
    );
  };

  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        position: "relative",
        mb: 1.5,
      }}
    >
      <StyledVideo
        src={video.url}
        autoPlay
        loop
        muted={isMuted}
        preload="metadata"
        controlsList="nodownload"
        disablePictureInPicture
        disableRemotePlayback
        onTimeUpdate={handleTimeUpdate}
      />
      <Tooltip
        title={isMuted ? "Unmute" : "Mute"}
        enterDelay={500}
        disableInteractive
      >
        <IconButton
          onClick={toggleMute}
          sx={{
            position: "absolute",
            top: (theme) => theme.spacing(1),
            right: (theme) => theme.spacing(1),
            backgroundColor: "#00000099",
            color: "white",
            "&:hover": {
              backgroundColor: "#00000099",
            },
          }}
        >
          {isMuted ? <VolumeOffIcon /> : <VolumeUpOutlinedIcon />}
        </IconButton>
      </Tooltip>
      <Box
        sx={{
          position: "absolute",
          height: 3,
          left: 0,
          right: 0,
          bottom: 1,
        }}
      >
        <LinearProgress variant="determinate" value={progress} color="error" />
      </Box>
      <TimeStatus time={remainingDuration} />
    </Box>
  );
}
