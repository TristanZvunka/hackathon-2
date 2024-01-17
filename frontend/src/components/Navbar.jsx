import { Link } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";
import favicon from "../assets/HomeIcon.svg";

function Navbar() {
  const navbarSX = {
    backgroundColor: "#28292C",
    flexDirection: "row",
    height: "4rem",
    justifyContent: "space-between",
    padding: "0.5rem 1rem 0.5rem 1rem",
  };

  const buttonSX = {
    borderRadius: "5px",
    backgroundColor: "#28292C",
    transition: "transform 250ms",
    "&:hover": {
      backgroundColor: "rgba(255, 255, 255, 0.15)",
      transform: "scale(0.9)",
    },
  };

  const fontSX = {
    fontWeight: "medium",
    fontSize: "medium",
  };

  return (
    <Box>
      <AppBar position="static" sx={navbarSX}>
        <Link to="/" className="navbar-menu">
        <Button color="inherit" sx={buttonSX}>
          <img
            src={favicon}
            alt="Logo du groupe L'Oréal"
            className="navbar-logo"
          />
        </Link>
        <div className="navbar-menu">
          <div className="menu-divider" />
          <Button
            color="inherit"
            sx={buttonSX}
            component={Link}
            to="/beauty-ia"
          >
            <Typography sx={fontSX}> Beauty IA </Typography>
          </Button>
          <div className="menu-divider" />
          <Button color="inherit" sx={buttonSX}>
            <Typography sx={fontSX}> Contact </Typography>
          </Button>
          <div className="menu-divider" />
        </div>
      </AppBar>
    </Box>
  );
}

export default Navbar;
