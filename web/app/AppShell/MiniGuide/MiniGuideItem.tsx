import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import NextLink from "next/link";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import { useActive } from "../useActive";

interface Props {
  label: string;
  href: string;
  icon: React.ReactNode;
  activeIcon: React.ReactNode;
}

export function MiniGuideItem(props: Props) {
  const { label, href, icon, activeIcon } = props;

  const active = useActive(href);

  return (
    <ListItem disablePadding>
      <ListItemButton
        component={NextLink}
        href={href}
        sx={{
          borderRadius: 2.5,
        }}
      >
        <Stack alignItems="center" pt={1}>
          {active ? activeIcon : icon}
          <Typography variant="caption" fontSize={10}>
            {label}
          </Typography>
        </Stack>
      </ListItemButton>
    </ListItem>
  );
}
