import { Person } from "@mui/icons-material";
import { Avatar, Menu, MenuItem } from "@mui/material";
import { MouseEvent, useState } from "react";

type AvatarMenuProps = {
  handleLogout: () => void;
};

export default function ({ handleLogout }: AvatarMenuProps) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

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
