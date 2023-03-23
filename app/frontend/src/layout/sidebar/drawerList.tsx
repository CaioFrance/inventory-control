import { ChevronLeft, Inventory } from "@mui/icons-material";
import {
  Box,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
} from "@mui/material";

export const drawer = (toggleDrawer: () => void) => (
  <Box>
    <Toolbar
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-end",
        px: [1],
      }}
    >
      <IconButton onClick={toggleDrawer}>
        <ChevronLeft />
      </IconButton>
    </Toolbar>
    <Divider />
    <List component="nav">
      <ListItem disablePadding>
        <ListItemButton>
          <ListItemIcon>
            <Inventory />
          </ListItemIcon>
          <ListItemText primary="Inventory" />
        </ListItemButton>
      </ListItem>
    </List>
  </Box>
);
