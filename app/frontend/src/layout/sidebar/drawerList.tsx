import { AddBusiness, ChevronLeft, Warehouse } from "@mui/icons-material";
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
        <ListItemButton href="/inventory">
          <ListItemIcon>
            <Warehouse />
          </ListItemIcon>
          <ListItemText primary="Inventory" />
        </ListItemButton>
      </ListItem>
      <ListItem disablePadding>
        <ListItemButton href="/supplier">
          <ListItemIcon>
            <AddBusiness />
          </ListItemIcon>
          <ListItemText primary="Supplier" />
        </ListItemButton>
      </ListItem>
    </List>
  </Box>
);
