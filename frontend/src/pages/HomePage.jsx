import Spline from "@splinetool/react-spline";
import Button from "@mui/material/Button";
import { Typography } from "@mui/material";
import { Link } from "react-router-dom";

const buttonSX = {
  width: "10rem",
  border: "solid",
  borderColor: "black",
  borderRadius: "20px",
  transition: "transform 250ms",
  borderWidth: "2px",
  "&:hover": {
    backgroundColor: "rgba(255, 255, 255, 0.15)",
    transform: "scale(0.9)",
  },
};

function HomePage() {
  return (
    <div className="body-content">
      <div className="body-center">
        <h1 className="home-page-title">
          L'ORÉAL met l'IA
          <br /> au service de la beauté
        </h1>
        <Spline
          scene="https://prod.spline.design/ISRA1bZLQVEKa8wW/scene.splinecode"
          className="spline"
        />
      </div>
      <div className="home-page-button">
        <Button sx={buttonSX} component={Link} to="/beauty-ia">
          {" "}
          <Typography variant="h5" color="black">
            Ask Me
          </Typography>{" "}
        </Button>
      </div>
    </div>
  );
}

export default HomePage;
