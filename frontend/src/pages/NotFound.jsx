import { Box, Button, Container, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import error from "../assets/error-404.png";

export default function NotFound() {
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

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        minHeight: "100vh",
        justifyContent: `space-between`,
      }}
    >
      <Container
        sx={{
          width: "15%",
          display: "flex",
          flexDirection: "column",
          textAlign: "center",
          gap: ".5rem",
        }}
      >
        <Typography variant="h1" fontWeight="bold">
          Erreur
        </Typography>
        <Typography variant="h5"> Cette page n'existe pas </Typography>
        <Button sx={buttonStyle} component={Link} to="/">
          {" "}
          Accueil{" "}
        </Button>
      </Container>
      <Container
        sx={{
          display: "flex",
          justifyContent: "space-around",
        }}
      >
        <img src={error} alt="" width={800} height={400} />
      </Container>
    </Box>
  );
}
