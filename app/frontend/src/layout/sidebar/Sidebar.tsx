import { styled, useTheme } from "@mui/material";
import MuiDrawer from "@mui/material/Drawer";
import util from "../util";
import { drawer } from "./drawerList";

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  "& .MuiDrawer-paper": {
    position: "relative",
    whiteSpace: "nowrap",
    width: util.drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: "border-box",
    ...(!open && {
      overflowX: "hidden",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(9),
      },
    }),
  },
}));

interface ISidebarProps {
  drawerOpen: boolean;
  toggleDrawer: () => void;
}

export default ({ toggleDrawer, drawerOpen }: ISidebarProps) => {
  const theme = useTheme();

  return (
    <Drawer variant="permanent" open={drawerOpen}>
      {drawer(toggleDrawer)}
    </Drawer>
  );
};
