import { Link } from "react-router-dom";
import React, { Suspense } from "react";

import Button from "@mui/material/Button";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";
import ArrowBackIosRoundedIcon from "@mui/icons-material/ArrowBackIosRounded";

import "../App.css";
import "./loader.css";

const Spline = React.lazy(() => import("@splinetool/react-spline"));

function HomePage() {
  const buttonStyle = {
    borderRadius: "5px",
    border: "2px solid #28292C",
    fontWeight: "bold",
    fontSize: "medium",
    color: "#28292C",
    transition: "transform 250ms",
    boxShadow: "0 10px 10px rgba(0, 0, 0, 0.10)",
    backdropFilter: "blur(10px)",
    "&:hover": {
      backgroundColor: "rgba(0, 0, 0, 0.05)",
      transform: "scale(0.9)",
    },
  };

  const arrowSx = {
    margin: "0 1rem 0 1rem",
  };

  return (
    <div className="homepage-body-content">
      <Suspense
        fallback={
          <div className="banter-loader">
            <div className="banter-loader__box" />
            <div className="banter-loader__box" />
            <div className="banter-loader__box" />
            <div className="banter-loader__box" />
            <div className="banter-loader__box" />
            <div className="banter-loader__box" />
            <div className="banter-loader__box" />
            <div className="banter-loader__box" />
            <div className="banter-loader__box" />
          </div>
        }
      >
        <Spline
          className="spline"
          scene="https://prod.spline.design/ISRA1bZLQVEKa8wW/scene.splinecode"
        />
      </Suspense>
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
