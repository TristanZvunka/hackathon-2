import { useState, useEffect } from "react";

import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import Lottie from "react-lottie-player";
import { toast } from "react-toastify";
import axios from "axios";

import LogInProgress from "../../public/Valid.json";

const defaultTheme = createTheme();

export default function SignInSide() {
  const [details, setDetails] = useState({
    email: "",
  });

  const [valid, setValid] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleDetailsChange = (event) => {
    const { name, value } = event.target;

    setDetails((prevDetails) => {
      return {
        ...prevDetails,
        [name]: value,
      };
    });
  };

  function escapeHtml(unsafe) {
    return unsafe.replace(/[&<"'>]/g, function toMatch(match) {
      switch (match) {
        case "&":
          return "&amp;";
        case "<":
          return "&lt;";
        case ">":
          return "&gt;";
        case '"':
          return "&quot;";
        case "'":
          return "&#39;";
        default:
          return match;
      }
    });
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/users/login`,
        {
          email: escapeHtml(details.email),
          password: escapeHtml(details.password),
        },
        { withCredentials: true }
      );

      if (response.data.message === "Authentification réussie") {
        setValid(true);
        toast.success(response.data.message, {
          position: "top-right",
          autoClose: 3300,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        setTimeout(() => {
          window.location.href = "/admin";
        }, 3800);
      } else {
        toast.error(response.data.message, {
          position: "top-right",
          autoClose: 2500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/api/users/check-id`, {
        withCredentials: true,
      })
      .then((response) => {
        if (response.data.message === "OK") {
          setIsLoggedIn(true);
          setTimeout(() => {
            window.location.href = "/admin";
          }, 3800);
        }
      });
  }, []);

  if (isLoggedIn) {
    return (
      <main>
        <div className="flex justify-center items-center flex-col h-screen text-center">
          <Lottie
            loop
            animationData={LogInProgress}
            play
            style={{ width: 200, height: 200 }}
          />
          <h1 className="text-3xl">Vous êtes déjà connecté(e)</h1>
        </div>
      </main>
    );
  }
  if (!valid) {
    return (
      <ThemeProvider theme={defaultTheme}>
        <Grid container component="main" sx={{ height: "calc(100vh - 5rem)" }}>
          <CssBaseline />
          <Grid
            item
            xs={false}
            sm={4}
            md={7}
            sx={{
              backgroundImage:
                "url(https://images.pexels.com/photos/3183183/pexels-photo-3183183.jpeg)",
              backgroundRepeat: "no-repeat",
              backgroundColor: (t) =>
                t.palette.mode === "light"
                  ? t.palette.grey[50]
                  : t.palette.grey[900],
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
          <Grid
            item
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            xs={12}
            sm={8}
            md={5}
            component={Paper}
            elevation={6}
            square
          >
            <Box
              sx={{
                my: 8,
                mx: 4,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Typography component="h1" variant="h5">
                Panneau Administrateur
              </Typography>
              <Box
                component="form"
                noValidate
                onSubmit={handleSubmit}
                sx={{ mt: 1 }}
              >
                <TextField
                  margin="normal"
                  onChange={handleDetailsChange}
                  value={details.email || ""}
                  required
                  fullWidth
                  id="email"
                  label="Adresse Email"
                  name="email"
                  autoComplete="email"
                  autoFocus
                />
                <TextField
                  margin="normal"
                  onChange={handleDetailsChange}
                  value={details.password || ""}
                  required
                  fullWidth
                  name="password"
                  label="Mot de Passe"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Se Connecter
                </Button>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </ThemeProvider>
    );
  }
  return (
    <div className="flex justify-center items-center flex-col h-screen">
      <Lottie
        loop
        animationData={LogInProgress}
        play
        style={{ width: 200, height: 200 }}
      />
      <h1 className="text-3xl">Connexion en cours...</h1>
    </div>
  );
}
