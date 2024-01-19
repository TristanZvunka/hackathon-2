import { Link } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";
import PsychologyIcon from "@mui/icons-material/Psychology";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

import axios from "axios";
import { useState, useEffect } from "react";
import favicon from "../assets/HomeIcon.svg";

function Navbar() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/api/requests`)
      .then((res) => {
        setCount(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const navbarSX = {
    backgroundColor: "#28292C",
    flexDirection: "row",
    height: "5rem",
    justifyContent: "space-between",
    padding: "0.5rem 1rem 0.5rem 1rem",
    position: "fixed",
    top: 0,
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

  const fontSX2 = {
    fontWeight: "small",
    fontSize: "small",
  };

  return (
    <>
      <Box>
        <AppBar position="static" sx={navbarSX}>
          <Link to="/" className="navbar-menu">
            <Button color="inherit" sx={buttonSX}>
              <img
                src={favicon}
                alt="Logo du groupe L'Oréal"
                className="navbar-logo"
              />
            </Button>
          </Link>
          <div className="navbar-menu navbar-menu-desktop">
            <div className="menu-divider" />
            <Typography sx={fontSX}> {count} Recherche </Typography>
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
            <Button
              color="inherit"
              sx={buttonSX}
              component={Link}
              to="https://www.loreal-paris.fr/"
            >
              <Typography sx={(fontSX, { marginRight: "1rem" })}>
                {" "}
                Boutique{" "}
              </Typography>
              <ShoppingCartIcon />
            </Button>
            <div className="menu-divider" />
          </div>
          <div className="navbar-menu navbar-menu-mobile">
            <Typography sx={fontSX2}> {count} Recherches </Typography>
            <IconButton
              color="inherit"
              sx={(fontSX, buttonSX)}
              component={Link}
              to="https://www.loreal-paris.fr/"
            >
              <PsychologyIcon />
            </IconButton>
            <IconButton
              color="inherit"
              sx={(fontSX, buttonSX)}
              component={Link}
              to="https://www.loreal-paris.fr/"
            >
              <ShoppingCartIcon />
            </IconButton>
          </div>
        </AppBar>
      </Box>
      <div className="container-pub">
        <div className="horizontal-scrolling-items">
          <div className="horizontal-scrolling-items__item">
            Lancôme | Giorgio Armani-Beauty | Yves Saint Laurent Beauté |
            Biotherm | Kiehl’s | Ralph Lauren | Shu Uemura | Cacharel | Helena
            Rubinstein | Clarisonic | Diesel | Viktor & Rolf | Yue Sai | Maison
            Margiela | Urban Decay | Guy Laroche | Paloma Picasso | Proenza
            Schouler | L’Oréal Paris | Magic | Garnier | Maybelline | African
            Beauty Brands | Essie | NYX Professional MakeUp | L’Oréal
            Professionnel Paris | Kérastase | Redken | Matrix | Pureology | Shu
            Uemura Art of Hair | Mizani | Decléor | Carita | Vichy | La
            Roche-Posay | SkinCeuticals | Roger & Gallet | Sanoflore |
          </div>

          <div className="horizontal-scrolling-items__item">
            Lancôme | Giorgio Armani-Beauty | Yves Saint Laurent Beauté |
            Biotherm | Kiehl’s | Ralph Lauren | Shu Uemura | Cacharel | Helena
            Rubinstein | Clarisonic | Diesel | Viktor & Rolf | Yue Sai | Maison
            Margiela | Urban Decay | Guy Laroche | Paloma Picasso | Proenza
            Schouler | L’Oréal Paris | Magic | Garnier | Maybelline | African
            Beauty Brands | Essie | NYX Professional MakeUp | L’Oréal
            Professionnel Paris | Kérastase | Redken | Matrix | Pureology | Shu
            Uemura Art of Hair | Mizani | Decléor | Carita | Vichy | La
            Roche-Posay | SkinCeuticals | Roger & Gallet | Sanoflore |
          </div>

          <div className="horizontal-scrolling-items__item">
            Lancôme | Giorgio Armani-Beauty | Yves Saint Laurent Beauté |
            Biotherm | Kiehl’s | Ralph Lauren | Shu Uemura | Cacharel | Helena
            Rubinstein | Clarisonic | Diesel | Viktor & Rolf | Yue Sai | Maison
            Margiela | Urban Decay | Guy Laroche | Paloma Picasso | Proenza
            Schouler | L’Oréal Paris | Magic | Garnier | Maybelline | African
            Beauty Brands | Essie | NYX Professional MakeUp | L’Oréal
            Professionnel Paris | Kérastase | Redken | Matrix | Pureology | Shu
            Uemura Art of Hair | Mizani | Decléor | Carita | Vichy | La
            Roche-Posay | SkinCeuticals | Roger & Gallet | Sanoflore |
          </div>

          <div className="horizontal-scrolling-items__item">
            Lancôme | Giorgio Armani-Beauty | Yves Saint Laurent Beauté |
            Biotherm | Kiehl’s | Ralph Lauren | Shu Uemura | Cacharel | Helena
            Rubinstein | Clarisonic | Diesel | Viktor & Rolf | Yue Sai | Maison
            Margiela | Urban Decay | Guy Laroche | Paloma Picasso | Proenza
            Schouler | L’Oréal Paris | Magic | Garnier | Maybelline | African
            Beauty Brands | Essie | NYX Professional MakeUp | L’Oréal
            Professionnel Paris | Kérastase | Redken | Matrix | Pureology | Shu
            Uemura Art of Hair | Mizani | Decléor | Carita | Vichy | La
            Roche-Posay | SkinCeuticals | Roger & Gallet | Sanoflore |
          </div>

          <div className="horizontal-scrolling-items__item">
            Lancôme | Giorgio Armani-Beauty | Yves Saint Laurent Beauté |
            Biotherm | Kiehl’s | Ralph Lauren | Shu Uemura | Cacharel | Helena
            Rubinstein | Clarisonic | Diesel | Viktor & Rolf | Yue Sai | Maison
            Margiela | Urban Decay | Guy Laroche | Paloma Picasso | Proenza
            Schouler | L’Oréal Paris | Magic | Garnier | Maybelline | African
            Beauty Brands | Essie | NYX Professional MakeUp | L’Oréal
            Professionnel Paris | Kérastase | Redken | Matrix | Pureology | Shu
            Uemura Art of Hair | Mizani | Decléor | Carita | Vichy | La
            Roche-Posay | SkinCeuticals | Roger & Gallet | Sanoflore |
          </div>
        </div>
      </div>
    </>
  );
}

export default Navbar;
