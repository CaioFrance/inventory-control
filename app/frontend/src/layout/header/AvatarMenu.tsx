import { Person } from "@mui/icons-material";
import { Avatar, Menu, MenuItem } from "@mui/material";
import { MouseEvent, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function () {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();

  const handleClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  async function handleLogout() {
    localStorage.removeItem("iventory.control.token");
    navigate("/login");
  }

  return (
    <>
      <Avatar
        id="avatar-menu"
        onClick={handleClick}
        sx={{
          ":hover": {
            cursor: "pointer",
          },
          bgcolor: "#aaa",
          color: "#fff",
        }}
      >
        <Person />
      </Avatar>

      <Menu
        id="avatar-menu"
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
      >
        <MenuItem>My profile</MenuItem>
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
    </>
  );
}
