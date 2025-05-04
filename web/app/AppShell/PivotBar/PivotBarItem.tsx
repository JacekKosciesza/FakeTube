import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import NextLink from "next/link";

import { useActive } from "../useActive";

interface Props {
  label: string;
  href: string;
  icon: React.ReactNode;
  activeIcon: React.ReactNode;
}

export function PivotBarItem(props: Props) {
  const { label, href, icon, activeIcon } = props;

  const active = useActive(href);

  return (
    <BottomNavigationAction
      component={NextLink}
      href={href}
      showLabel
      label={label}
      icon={active ? activeIcon : icon}
      sx={{
        "&.MuiBottomNavigationAction-root": {
          color: "inherit",
        },
      }}
    />
  );
}
