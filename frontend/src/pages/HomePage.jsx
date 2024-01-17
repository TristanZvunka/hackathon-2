import { Link } from "react-router-dom";
import Spline from "@splinetool/react-spline";

import Button from "@mui/material/Button";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";
import ArrowBackIosRoundedIcon from "@mui/icons-material/ArrowBackIosRounded";

import "../App.css";

function HomePage() {
  const buttonStyle = {
    borderRadius: "5px",
    border: "2px solid #28292C",
    fontWeight: "bold",
    fontSize: "medium",
    color: "#28292C",
    transition: "transform 250ms",
    "&:hover": {
      backgroundColor: "rgba(255, 255, 255, 0.15)",
      transform: "scale(0.9)",
    },
  };

  const arrowSx = {
    margin: "0 1rem 0 1rem",
  };

  return (
    <div className="homepage-body-content">
      <Spline
        className="spline"
        scene="https://prod.spline.design/ISRA1bZLQVEKa8wW/scene.splinecode"
      />
      <div className="content-button">
        <ArrowForwardIosRoundedIcon sx={arrowSx} />
        <Button sx={buttonStyle} component={Link} to="/beauty-ia">
          Posez votre question
        </Button>
        <ArrowBackIosRoundedIcon sx={arrowSx} />
      </div>
    </div>
  );
}

export default HomePage;
