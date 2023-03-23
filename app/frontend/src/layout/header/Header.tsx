import { styled } from "@mui/material/styles";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import util from "../util";
import { IconButton, Toolbar } from "@mui/material";
import { AccountCircle, Menu } from "@mui/icons-material";
import AvatarMenu from "./AvatarMenu";

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: util.drawerWidth,
    width: `calc(100% - ${util.drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

interface IAppBarProps {
  open: boolean;
  toggleDrawer: () => void;
}

export default ({ open, toggleDrawer }: IAppBarProps) => {
  return (
    <AppBar position="absolute" open={open} elevation={0}>
      <Toolbar
        sx={{
          pr: "24px",
        }}
      >
        <IconButton
          edge="start"
          color="inherit"
          aria-label="open drawer"
          onClick={toggleDrawer}
          sx={{
            marginRight: "36px",
            ...(open && { display: "none" }),
          }}
        >
          <Menu />
        </IconButton>
        <Toolbar sx={{ flexGrow: 1 }} />
        <AvatarMenu handleLogout={() => null} />
      </Toolbar>
    </AppBar>
  );
};
