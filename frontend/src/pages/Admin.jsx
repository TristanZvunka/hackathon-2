import axios from "axios";
import { useState, useEffect } from "react";
import Lottie from "react-lottie-player";
import { BarChart, Bar, XAxis, Tooltip, YAxis } from "recharts";
import { Link } from "react-router-dom";

import mailError from "../../public/Error.json";

export default function Admin() {
  const [datas, setDatas] = useState([]);

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const getData = () => {
    const endpoints = [`${import.meta.env.VITE_BACKEND_URL}/api/datas`];
    Promise.all(
      endpoints.map((endpoint) =>
        axios.get(endpoint, { withCredentials: true })
      )
    ).then(([{ data: donnee }]) => {
      setDatas(donnee);
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

  // eslint-disable-next-line
  function CustomTooltip({ active, payload, label }) {
    // eslint-disable-next-line
    if (active && payload && payload.length) {
      return (
        <div className="py-4 px-2 border-2 border-[#e6e3de] text-[#e6e3de] rounded-xl ">
          <p>Mot: {label}</p>
          {/* eslint-disable-next-line */}
          <p>Utilisation: {payload[0].value}</p>
        </div>
      );
    }
  }

  if (isLoggedIn) {
    return (
      <div className="min-h-screen h-auto flex items-center flex-col mt-28 p-4 bg-[#e6e3de]">
        <h1 className="text-3xl md:text-5xl bold text-center">Panel Admin</h1>
        <h2 className="text-2xl md:text-4xl mt-16 text-center">Stats:</h2>
        <p className="text-xl md:text-2xl text-center">
          Mot les plus utilisé dans les questions
        </p>
        <div className="flex flex-col justify-center items-center mt-2">
          <BarChart width={1000} height={400} data={datas}>
            <XAxis dataKey="mot" />
            <YAxis />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="count" fill="#28292C" />
          </BarChart>
        </div>
        <div className="flex gap-4 mt-4 w-full justify-center">
          <Link
            to="/admin-users"
            className="border-2 border-[#28292C] w-full max-w-[30rem] py-2 rounded-2xl mt-8 hover:bg-[#28292C] hover:text-white text-center"
          >
            Liste des Admins
          </Link>
          <Link
            to="/admin-blacklist"
            className="border-2 border-[#28292C] w-full max-w-[30rem] py-2 rounded-2xl mt-8 hover:bg-[#28292C] hover:text-white text-center"
          >
            Blacklist
          </Link>
          <Link
            to="/admin-wordlist"
            className="border-2 border-[#28292C] w-full max-w-[30rem] py-2 rounded-2xl mt-8 hover:bg-[#28292C] hover:text-white text-center"
          >
            Liste des Mots
          </Link>
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
