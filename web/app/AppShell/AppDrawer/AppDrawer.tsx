import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";

import { Guide } from "./Guide";

export interface Props {
  open: boolean;
  onDrawerClose: () => void;
  variant?: "temporary" | "permanent";
}

export function AppDrawer(props: Props) {
  const { open, onDrawerClose, variant } = props;

  const handleDrawerClose = () => {
    if (variant === "temporary") onDrawerClose();
  };

  return (
    <Drawer
      open={open}
      onClose={onDrawerClose}
      sx={{
        "& .MuiDrawer-paper": {
          mt: variant === "temporary" ? 0 : 8,
          borderRight: "none",
        },
      }}
      variant={variant}
    >
      <Box
        role="presentation"
        onClick={handleDrawerClose}
        onKeyDown={handleDrawerClose}
        display="flex"
        flexDirection="column"
        justifyContent="space-between"
        sx={{
          height: (theme) =>
            `calc(100% - ${theme.spacing(variant === "temporary" ? 2 : 8)})`,
        }}
      >
        <Guide onDrawerClose={handleDrawerClose} variant={variant} />
      </Box>
    </Drawer>
  );
}
