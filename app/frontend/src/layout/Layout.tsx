import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import { Box } from "@mui/system";
import { ReactNode, useState } from "react";
import Header from "./header/Header";
import Sidebar from "./sidebar/Sidebar";

interface ILayoutProps {
  children: ReactNode;
}

const theme = createTheme({
  palette: {
    primary: {
      main: "#00796b",
    },
  },
});

export default ({ children }: ILayoutProps) => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <Header open={drawerOpen} toggleDrawer={toggleDrawer} />
        <Sidebar toggleDrawer={toggleDrawer} drawerOpen={drawerOpen} />
        <Box
          component="main"
          sx={{ flexGrow: 1, height: "100vh", overflow: "auto", pt: 10 }}
        >
          {children}
        </Box>
      </Box>
    </ThemeProvider>
  );
};
