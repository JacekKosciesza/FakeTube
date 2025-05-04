import Box from "@mui/material/Box";
import Container from "@mui/material/Container";

import { Navigation } from "../useNavigation";

interface Props {
  navigation: Navigation;
  children: React.ReactNode;
}

export function PageManager({ navigation, children }: Props) {
  let ml = 0;
  let px = 0;

  if (navigation.guide && navigation.variant === "permanent") {
    ml = 30;
    px = 3;
  }

  if (navigation.miniGuide) {
    ml = 9;
    px = 3;
  }

  return (
    <Container maxWidth={"xxxl"} disableGutters>
      <Box
        sx={{
          ml,
          mt: 1,
          px,
        }}
      >
        {children}
      </Box>
    </Container>
  );
}
