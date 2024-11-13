import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Drawer,
  Box,
  Button,
  Badge,
  Avatar,
  Typography,
} from "@mui/material"; 
import MenuIcon from "@mui/icons-material/Menu";
import { Link } from "react-router-dom";
import { logout } from "../stores/authStore";
import LogoIcon from "../assets/caixabank-icon-blue.png";
import NotificationsButton from "./NotificationsButton";

const NavBarLogged = () => {
  return (
    <>
      <Button component={Link} to="/" color="inherit">
        Dashboard
      </Button>
      <Button component={Link} to="/transactions" color="inherit">
        Transactions
      </Button>
      <Button component={Link} to="/analysis" color="inherit">
        Analysis
      </Button>
      <Button component={Link} to="/settings" color="inherit">
        Settings
      </Button>
      <Button component={Link} to="/support" color="inherit">
        Support
      </Button>
    </>
  );
};

const Navbar = ({ toggleTheme, isDarkMode, isAuthenticated, user }) => {
  const [drawerOpen, setDrawerOpen] = useState(false); 

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return; 
    }
    setDrawerOpen(open); 
  };

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            aria-label="menu"
            onClick={toggleDrawer(true)}
            sx={{ display: { xs: "flex", md: "none" } }}
          >
            <MenuIcon />
            <Typography
              variant="h6"
              component="span"
              sx={{ ml: 1, color: "#000" }}
            >
              <i>CaixaBankNow</i>
            </Typography>
          </IconButton>
          <Box
            component="img"
            src={LogoIcon}
            alt="Logo"
            sx={{
              display: { xs: "none", md: "block" },
              height: 40,
              marginLeft: 2,
            }}
          />
          <Box
            sx={{
              flexGrow: 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
            }}
          >
            {isAuthenticated ? (
              <Box
                sx={{
                  display: { xs: "none", md: "flex" },
                }}
              >
                <NavBarLogged />
                <Box sx={{ borderLeft: "1px solid #ddd" }}>
                  <Button onClick={logout} color="inherit">
                    Logout
                  </Button>
                </Box>
              </Box>
            ) : (
              <>
                <Button component={Link} to="/login" color="inherit">
                  Login
                </Button>
                <Button component={Link} to="/register" color="inherit">
                  Register
                </Button>
              </>
            )}

            {isAuthenticated && <NotificationsButton />}

            {isAuthenticated && user && (
              <>
                <Avatar alt={user.email} src={user.avatarUrl} sx={{ ml: 2 }} />
              </>
            )}
          </Box>
        </Toolbar>
      </AppBar>

      <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
        <Box
          role="presentation"
          onClick={toggleDrawer(false)} 
          onKeyDown={toggleDrawer(false)}
          sx={{
            width: 250,
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
          }} 
        >
          {isAuthenticated ? (
            <NavBarLogged />
          ) : (
            <>
              <Button component={Link} to="/login">
                Login
              </Button>
              <Button component={Link} to="/register">
                Register
              </Button>
            </>
          )}
        </Box>
      </Drawer>
    </>
  );
};

export default Navbar;
