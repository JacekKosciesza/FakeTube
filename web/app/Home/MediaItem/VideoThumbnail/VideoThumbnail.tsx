import Box from "@mui/material/Box";

import { Video } from "../../video";
import { TimeStatus } from "../TimeStatus";

interface Props {
  video: Video;
}

export function VideoThumbnail({ video }: Props) {
  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        position: "relative",
        mb: 1.5,
      }}
    >
      <Box
        component="img"
        alt=""
        src={video.thumbnail}
        sx={{
          borderRadius: 3,
          aspectRatio: "16 / 9",
          maxWidth: "100%",
          display: "block",
          objectFit: "cover",
        }}
      />
      <TimeStatus time={video.duration} />
    </Box>
  );
}
