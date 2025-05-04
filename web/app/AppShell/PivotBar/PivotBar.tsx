import BottomNavigation from "@mui/material/BottomNavigation";
import HomeIcon from "@mui/icons-material/Home";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import Paper from "@mui/material/Paper";

import { PivotBarItem } from "./PivotBarItem";

export function PivotBar() {
  return (
    <Paper
      sx={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: (theme) => theme.zIndex.appBar,
      }}
      elevation={1}
    >
      <BottomNavigation showLabels>
        <PivotBarItem
          label="Home"
          href="/"
          icon={<HomeOutlinedIcon />}
          activeIcon={<HomeIcon />}
        />
      </BottomNavigation>
    </Paper>
  );
}
