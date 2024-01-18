import axios from "axios";
import { useState, useEffect } from "react";
import Lottie from "react-lottie-player";
import { toast } from "react-toastify";
import UserCard from "../components/UserCard";

import mailError from "../../public/Error.json";

export default function Admin() {
  const [users, setUsers] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [searchForm, setSearchForm] = useState("");
  function updateForm(e) {
    setSearchForm(e.target.value);
  }

  const [details, setDetails] = useState({
    email: "",
  });

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

  const isEmailValid = (value) => {
    const emailPattern = /^((?!\.)[\w\-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/;
    return emailPattern.test(value);
  };

  const isPasswordValid = (value) => {
    const passwordPattern =
      /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=.\-_*])([a-zA-Z0-9@#$%^&+=*.\-_]){8,}$/;
    return passwordPattern.test(value);
  };

  const adduserHandler = async () => {
    if (!isEmailValid(details.email)) {
      toast.error("Votre email n'est pas valide", {
        position: "top-right",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } else if (!isPasswordValid(details.password)) {
      toast.error(
        "Votre mot de passe doit contenir une majuscule, une minuscule, un chiffre et un caractère spécial",
        {
          position: "top-right",
          autoClose: 2500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        }
      );
    } else {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/users`,
        {
          email: escapeHtml(details.email),
          password: escapeHtml(details.password),
        },
        {
          withCredentials: true,
        }
      );

      if (response.data.message === "Votre compte a était crée") {
        window.location.reload();
        toast.success(response.data.message, {
          position: "top-right",
          autoClose: 2500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
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
    }
  };

  const getData = () => {
    const endpoints = [`${import.meta.env.VITE_BACKEND_URL}/api/users`];
    Promise.all(
      endpoints.map((endpoint) =>
        axios.get(endpoint, { withCredentials: true })
      )
    ).then(([{ data: user }]) => {
      setUsers(user);
    });
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/api/users/check-id`, {
        withCredentials: true,
      })
      .then((response) => {
        if (response.data.message === "OK") {
          setIsLoggedIn(true);
        } else {
          setIsLoggedIn(false);
          setTimeout(() => {
            window.location.href = "/login";
          }, 3800);
        }
      });
  }, []);

  if (isLoggedIn) {
    return (
      <div className="min-h-screen h-auto flex items-center flex-col mt-28 p-4 bg-[#e6e3de]">
        <h1 className="text-3xl md:text-5xl bold text-center">
          Liste des Admins
        </h1>
        <div className="w-full flex justify-center mt-4">
          <div className="flex px-4 py-1 rounded-full items-center bg-secondary-dark w-full max-w-[30rem] border-2 border-[#28292C]">
            <div className="bg-[url('/search-icon.svg')] h-8 bg-no-repeat w-12" />
            <form onChange={updateForm} className="w-full">
              <input
                placeholder="Rechercher une liste"
                className="bg-[#e6e3de] text-primary-dark outline-0 w-full"
              />
            </form>
          </div>
        </div>
        <div className="w-full flex flex-col justify-center items-center mt-8 gap-4">
          <div className="flex justify-between items-center h-20 w-[70%] border-2 border-[#000] rounded-2xl">
            <form
              className="flex flex-col mx-8 gap-4"
              onChange={handleDetailsChange}
            >
              <input
                type="text"
                placeholder="Email"
                className="outline-0 w-full max-w-[30rem] h-full bg-[#e6e3de]"
                value={details.email || ""}
                name="email"
              />
              <input
                type="password"
                placeholder="Mot de Passe"
                className="outline-0 w-full max-w-[30rem] h-full bg-[#e6e3de]"
                value={details.password || ""}
                name="password"
              />
            </form>
            <button
              type="button"
              className="w-16 h-full"
              onClick={() => adduserHandler()}
            >
              +
            </button>
          </div>
          {users &&
            users
              .filter((user) =>
                user.email.toLowerCase().includes(searchForm.toLowerCase())
              )
              .map((user) => <UserCard key={user.id} email={user.email} />)}
        </div>
      </div>
    );
  }
  return (
    <main>
      <div className="flex justify-center items-center flex-col h-screen text-center bg-[#e6e3de]">
        <Lottie
          loop
          animationData={mailError}
          play
          style={{ width: 200, height: 200 }}
        />
        <h1 className="text-3xl">Accès Impossible</h1>
        <p className="text-xl">
          {`
          Vous devez vous connecter pour accéder à cette page.  `}
          <br />
          {` Vous allez être redirigé(e) vers la page de connexion. `}
        </p>
      </div>
    </main>
  );
}
