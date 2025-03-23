import React, { useState } from "react";
import { AppBar, Toolbar, Typography, Button, Box, IconButton, Avatar, Menu, MenuItem, Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const { logout, user } = useAuth();
  const [openLogoutDialog, setOpenLogoutDialog] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    setOpenLogoutDialog(false);
    await logout();
    navigate("/login");
  };

  return (
    <AppBar
      position="static"
      sx={{ backgroundColor: "background.default", minHeight: "100px" }}
    >
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', marginTop: '15px' }}>
        <Box>
          <Typography color="#5268F7" variant="h5" sx={{ flexGrow: 1, fontWeight: 700 }}>
            TTMS
          </Typography>
        </Box>
        <Box>
          <IconButton onClick={handleMenuOpen} sx={{ p: 0 }}>
            <Avatar alt={user?.email || "User"} />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            transformOrigin={{ vertical: "top", horizontal: "right" }}
          >
            <Box sx={{ px: 2, py: 1 }}>
              <Typography variant="subtitle2" color="textSecondary">
                Signed in as
              </Typography>
              <Typography variant="body2" noWrap>
                {user?.email}
              </Typography>
            </Box>

            <MenuItem disabled>
              <Box sx={{ width: "100%", borderBottom: "1px solid #ccc" }} />
            </MenuItem>

            <MenuItem onClick={() => setOpenLogoutDialog(true)}>Logout</MenuItem>
          </Menu>
        </Box>
      </Toolbar>
      <Dialog open={openLogoutDialog} onClose={() => setOpenLogoutDialog(false)}>
        <DialogTitle>Confirm Logout</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to logout?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => {
            setOpenLogoutDialog(false);
            setAnchorEl(null);
          }} color="inherit">
            Cancel
          </Button>
          <Button onClick={handleLogout} color="error">
            Yes, Logout
          </Button>
        </DialogActions>
      </Dialog>
    </AppBar>
  );
};

export default Navbar;
