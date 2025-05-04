import Drawer from "@mui/material/Drawer";
import HomeIcon from "@mui/icons-material/Home";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import List from "@mui/material/List";

import { MiniGuideItem } from "./MiniGuideItem";

export function MiniGuide() {
  return (
    <Drawer
      open={true}
      variant="permanent"
      sx={{
        "& .MuiDrawer-paper": {
          width: (theme) => theme.spacing(9),
          mt: 8,
          pt: 0.3,
          px: 0.8,
          borderRight: "none",
        },
      }}
    >
      <List disablePadding>
        <MiniGuideItem
          label="Home"
          href="/"
          icon={<HomeOutlinedIcon />}
          activeIcon={<HomeIcon />}
        />
      </List>
    </Drawer>
  );
}
