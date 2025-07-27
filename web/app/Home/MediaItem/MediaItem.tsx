import Box from "@mui/material/Box";

import { Video } from "../video";
import { VideoDetails } from "./VideoDetails";
import { VideoThumbnail } from "./VideoThumbnail";

interface Props {
  video: Video;
}

export function MediaItem({ video }: Props) {
  return (
    <Box
      sx={{
        width: "100%",
        mb: 2,
        display: "block",
        aspectRatio: "16 / 9",
      }}
    >
      <VideoThumbnail video={video} />
      <VideoDetails video={video} />
    </Box>
  );
}
