import { NavLink as RouterLink } from "react-router-dom";

import NightlightRoundedIcon from "@mui/icons-material/NightlightRounded";
import LightModeRoundedIcon from "@mui/icons-material/LightModeRounded";
import { Link, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";

import { useContext } from "react";

import { ColorModeContext } from "../context/ColorModeContext";


export const Navbar = () => {
  const theme = useTheme();
  const colorMode = useContext(ColorModeContext);

  return (
    <Box
      component="nav"
      sx={{
        backgroundColor: "success.main",
        display: "flex",
        color: "white",
      }}
    >
      <Box
        component="ul"
        sx={{
          listStyle: "none",
          display: "flex",
          alignItems: "center",
          padding: 0,
          width: 1,
        }}
      >
        <Box component="li" sx={{ flexGrow: 1, ml: { xs: 5, md: 10 } }}>
          <Typography
            variant="h5"
            sx={{ mb: 0 }}
            gutterBottom
          >
            <Link
              component={RouterLink}
              to="/"
              sx={{ textDecoration: "none", color: "inherit" }}
            >
              JaraxaCare
            </Link>
          </Typography>
        </Box>
        <Box component="li">
          <IconButton
            sx={{ mr: { xs: 3, md: 7 } }}
            onClick={colorMode.toggleColorMode}
            color="inherit"
          >
            {theme.palette.mode === "dark" ? (
              <NightlightRoundedIcon />
            ) : (
              <LightModeRoundedIcon />
            )}
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
};
