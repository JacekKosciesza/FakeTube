import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";

import { Logo } from "../Logo";
import { GuideButton } from "../AppDrawer/Guide";

export interface Props {
  onGuideButtonClick: () => void;
  showGuideButton?: boolean;
}

export function Masthead({ onGuideButtonClick, showGuideButton }: Props) {
  return (
    <AppBar elevation={0} position="static">
      <Toolbar>
        {showGuideButton && <GuideButton onClick={onGuideButtonClick} />}
        <Logo />
      </Toolbar>
    </AppBar>
  );
}
