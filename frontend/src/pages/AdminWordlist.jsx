import axios from "axios";
import { useState, useEffect } from "react";
import Lottie from "react-lottie-player";

import mailError from "../../public/Error.json";
import WordCard from "../components/WordCard";

export default function Admin() {
  const [datas, setDatas] = useState([]);

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [searchForm, setSearchForm] = useState("");
  function updateForm(e) {
    setSearchForm(e.target.value);
  }

  const getData = () => {
    const endpoints = [`${import.meta.env.VITE_BACKEND_URL}/api/datas/all`];
    Promise.all(
      endpoints.map((endpoint) =>
        axios.get(endpoint, { withCredentials: true })
      )
    ).then(([{ data }]) => {
      setDatas(data);
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
          Liste des Mots
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
          {datas &&
            datas
              .filter((data) =>
                data.mot.toLowerCase().includes(searchForm.toLowerCase())
              )
              .map((data) => (
                <WordCard key={data.id} mot={data.mot} count={data.count} />
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
