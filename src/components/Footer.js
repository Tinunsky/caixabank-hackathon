import React from "react";
import backgroundImage from "../assets/bgmaps.png";
import SearchIcon from "@mui/icons-material/Search";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import {
  Box,
  Typography,
  Paper,
  IconButton,
  InputBase,
  Button,
} from "@mui/material";

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "200px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: 2,
        marginTop: "50px",
      }}
    >
      {/* Search bar */}
      <Box>
        <Paper
          component="form"
          sx={{
            display: "flex",
            alignItems: "center",
            padding: "0 10px",
            gap: 1,
            margin: "14px",
          }}
        >
          <SearchIcon />
          <InputBase placeholder="Find your branch..." />
          <Button type="submit">Search</Button>
        </Paper>
      </Box>

      <Typography>
        © {new Date().getFullYear()} Personal Finance Assistant
      </Typography>
      
      <Box>
        <IconButton
          aria-label="Facebook"
          href="https://facebook.com"
          target="_blank"
        >
          {" "}
          <FacebookIcon />
        </IconButton>

        <IconButton
          aria-label="Twitter"
          href="https://twitter.com"
          target="_blank"
        >
          <TwitterIcon />
        </IconButton>

        <IconButton
          aria-label="Instagram"
          href="https://instagram.com"
          target="_blank"
        >
          <InstagramIcon />
        </IconButton>
      </Box>
    </Box>
  );
};

export default Footer;
