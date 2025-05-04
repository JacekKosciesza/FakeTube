import useMediaQuery from "@mui/material/useMediaQuery";
import useTheme from "@mui/system/useTheme";

export interface Navigation {
  pivotBar?: boolean;
  miniGuide?: boolean;
  guide?: boolean;
  variant?: "temporary" | "permanent";
}

export function useNavigation(opened: boolean): Navigation {
  const theme = useTheme();
  const tablet = useMediaQuery(theme.breakpoints.between("sm", "lg"));
  const desktop = useMediaQuery(theme.breakpoints.up("lg"));

  const navigation: Navigation = {
    pivotBar: true,
    miniGuide: false,
    guide: false,
  };

  if (tablet) {
    return { guide: true, miniGuide: true, variant: "temporary" };
  }

  if (desktop) {
    return opened
      ? { guide: true, variant: "permanent" }
      : { guide: false, miniGuide: true, variant: "temporary" };
  }

  return navigation;
}
