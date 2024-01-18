import axios from "axios";
import { useState, useEffect } from "react";
import Lottie from "react-lottie-player";
import { toast } from "react-toastify";

import mailError from "../../public/Error.json";
import BlacklistCard from "../components/BlacklistCard";

export default function Admin() {
  const [blackLists, setBlackLists] = useState([]);
  const [mot, setMot] = useState("");

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [searchForm, setSearchForm] = useState("");
  function updateForm(e) {
    setSearchForm(e.target.value);
  }
  const getData = () => {
    const endpoints = [`${import.meta.env.VITE_BACKEND_URL}/api/blacklists`];
    Promise.all(
      endpoints.map((endpoint) =>
        axios.get(endpoint, { withCredentials: true })
      )
    ).then(([{ data: blacklist }]) => {
      setBlackLists(blacklist);
    });
  };

  useEffect(() => {
    getData();
  }, []);

  const addHandler = () => {
    try {
      if (mot === "") {
        toast.error("Vous devez écrire un mot a ajouter a la Blacklist", {
          position: "top-right",
          autoClose: 2500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      } else if (mot.split(" ").length > 1) {
        toast.error("Il ne doit pas il y avoir plus d'un mot a la fois", {
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
        axios
          .post(
            `${import.meta.env.VITE_BACKEND_URL}/api/blacklists`,
            {
              mot,
            },
            { withCredentials: true }
          )
          .then((res) => {
            if (
              res.data.message === "Mot ajouté avec succès dans la blacklist"
            ) {
              window.location.reload();
              toast.success(res.data.message, {
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
          });
      }
    } catch (err) {
      console.error(err);
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
          Liste des Mots Blacklist
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
        <div className="w-[70%] flex flex-wrap justify-center items-center mt-8 gap-4">
          <div className="flex justify-center items-center flex-col h-40 w-40 border-2 border-[#000] rounded-2xl">
            <form
              className="flex justify-center items-center w-full"
              onChange={(e) => setMot(e.target.value)}
            >
              <input
                placeholder="Mot"
                className="w-full text-center outline-0 bg-[#e6e3de]"
              />
            </form>
            <button
              type="button"
              className="border-2 border-black rounded-full mt-2 px-4 py-1"
              onClick={() => addHandler()}
            >
              Ajouter
            </button>
          </div>
          {blackLists &&
            blackLists
              .filter((blacklist) =>
                blacklist.mot.toLowerCase().includes(searchForm.toLowerCase())
              )
              .map((blacklist) => (
                <BlacklistCard
                  key={blacklist.id}
                  mot={blacklist.mot}
                  id={blacklist.id}
                />
              ))}
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
