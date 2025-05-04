import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";

interface Props {
  onClick: () => void;
}

export function GuideButton(props: Props) {
  const { onClick } = props;

  return (
    <IconButton
      onClick={onClick}
      size="large"
      edge="start"
      color="inherit"
      aria-label="Guide"
      sx={{ mr: 2 }}
    >
      <MenuIcon />
    </IconButton>
  );
}
