import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Skeleton from "@mui/material/Skeleton";
import Typography from "@mui/material/Typography";

interface Props {
  animation?: "wave" | "pulse" | false;
}

export function MediaSkeleton({ animation = false }: Props) {
  return (
    <Stack spacing={1.5}>
      <Skeleton
        variant="rectangular"
        animation={animation}
        sx={{
          borderRadius: 3,
          height: "inherit",
          aspectRatio: "16 / 9",
        }}
      />
      <Stack direction="row" spacing={1}>
        <Box>
          <Skeleton
            variant="circular"
            width={36}
            height={36}
            animation={animation}
          />
        </Box>
        <Stack width="100%">
          <Typography variant="subtitle1">
            <Skeleton variant="text" width="100%" animation={animation} />
          </Typography>
          <Typography variant="subtitle2">
            <Skeleton variant="text" width="50%" animation={animation} />
          </Typography>
        </Stack>
      </Stack>
    </Stack>
  );
}
