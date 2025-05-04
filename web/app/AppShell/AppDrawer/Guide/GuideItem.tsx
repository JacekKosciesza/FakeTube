import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import NextLink from "next/link";

import { useActive } from "../../useActive";

interface Props {
  label: string;
  href: string;
  icon: React.ReactNode;
  activeIcon: React.ReactNode;
  onClick: () => void;
}

export function GuideItem(props: Props) {
  const { label, href, icon, activeIcon, onClick } = props;

  const active = useActive(href);

  return (
    <ListItem disablePadding>
      <ListItemButton
        component={NextLink}
        onClick={onClick}
        href={href}
        sx={{
          pl: 2,
          borderRadius: 2.5,
          backgroundColor: (theme) =>
            active ? theme.palette.action.selected : "inherit",
          fontWeight: active ? "bolder" : "normal",
        }}
      >
        <ListItemIcon
          sx={{
            color: (theme) => theme.palette.text.primary,
            minWidth: "42px",
          }}
        >
          {active ? activeIcon : icon}
        </ListItemIcon>
        <ListItemText
          primary={label}
          slotProps={{
            primary: {
              sx: {
                fontWeight: active ? "bolder" : "normal",
                fontSize: 14,
              },
            },
          }}
        />
      </ListItemButton>
    </ListItem>
  );
}
