import HomeIcon from "@mui/icons-material/Home";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import List from "@mui/material/List";
import Stack from "@mui/material/Stack";
import Toolbar from "@mui/material/Toolbar";

import { GuideButton } from "./GuideButton";
import { GuideItem } from "./GuideItem";
import { Logo } from "../../Logo";

interface Props {
  onDrawerClose: () => void;
  variant?: "temporary" | "permanent";
}

export function Guide(props: Props) {
  const { onDrawerClose, variant } = props;

  const handleDrawerClose = () => {
    if (variant === "temporary") onDrawerClose();
  };

  return (
    <Stack>
      {variant === "temporary" && (
        <Toolbar>
          <GuideButton onClick={handleDrawerClose} />
          <Logo />
        </Toolbar>
      )}
      <List sx={{ width: 240, p: 1 }}>
        <GuideItem
          label="Home"
          href="/"
          icon={<HomeOutlinedIcon />}
          activeIcon={<HomeIcon />}
          onClick={handleDrawerClose}
        />
      </List>
    </Stack>
  );
}
