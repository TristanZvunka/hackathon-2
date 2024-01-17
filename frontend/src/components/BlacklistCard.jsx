import axios from "axios";
import { toast } from "react-toastify";
// eslint-disable-next-line
export default function blacklistCard({ mot }) {
  const deleteHandler = async () => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/blacklists/delete`,
        {
          mot,
        },
        {
          withCredentials: true,
        }
      );

      if (
        response.data.message === "Mot supprimé avec succès de la blacklist"
      ) {
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
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex justify-center items-center flex-col h-40 w-40 border-2 border-[#000] rounded-2xl">
      <p>Mot: {mot}</p>
      <button
        type="button"
        className="border-2 border-black rounded-full mt-2 px-4 py-1"
        onClick={() => deleteHandler()}
      >
        Supprimer
      </button>
    </div>
  );
}
