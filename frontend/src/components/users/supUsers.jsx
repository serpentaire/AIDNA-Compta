import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import apiConnexion from "../../services/apiConnexion";
import "react-toastify/dist/ReactToastify.css";
import toastiConfig from "../../services/toastiConfig";
import getUsers from "../../CRUD/getUsers";

function SupUsers() {
  const [utilisats, setUtilisats] = useState([]);
  // Pour faire la mise à jour de l'écran
  const deleteUser = (id) => {
    const newUtilisats = [...utilisats];
    newUtilisats.splice(utilisats.indexOf(id), 1);
    setUtilisats(newUtilisats);
  };
  // Récupération de tous les users
  const getUsersData = async () => {
    const allUsers = await getUsers();
    setUtilisats(allUsers);
  };
  // suppression de l'utilisateur
  const supUsers = (id) => {
    apiConnexion
      .delete(`/users/${id}`)
      .then(() => {
        deleteUser(id);
        toast.success(`L'utilisateur a bien été supprimée.`, toastiConfig);
      })
      .catch((err) => {
        toast.error(`Une erreur s'est produite`, toastiConfig);
        console.warn(err);
      });
  };
  useEffect(() => {
    getUsersData();
  }, []);

  return (
    <div className="supUtilisateur">
      <h2 className="h2compo grow md:text-center m-1 mt-5 md:text-xl">
        Supprimer un utilisateur
      </h2>
      <div className="tableau flex justify-center">
        <table className=" m-2 border-collapse border-2 text-xs text-center">
          <thead>
            <tr>
              <th className="p-2 border border-2 w-20">Login</th>
              <th className="p-2 border border-2 w-96">Nom</th>
              <th className="p-2 border border-2 w-96">Prénom</th>
              <th className="p-2 border border-2 w-96">Rôle</th>
              <th className="p-2 border border-2">Supprimer</th>
            </tr>
          </thead>
          {utilisats.map((utilisat) => (
            <tr key={utilisat.id}>
              <td className="border px-4 py-2">{utilisat.Users_log.login}</td>
              <td className="border px-4 py-2">{utilisat.nom}</td>
              <td className="border px-4 py-2">{utilisat.prenom}</td>
              <td className="border px-4 py-2">{utilisat.Role.nom}</td>
              <td className="border px-4 py-2">
                <button
                  className="underline"
                  type="button"
                  onClick={() => supUsers(utilisat.id)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-6 h-6 md:w-8 md:h-8"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5m6 4.125l2.25 2.25m0 0l2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25 2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z"
                    />
                  </svg>
                </button>
              </td>
            </tr>
          ))}
        </table>
      </div>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
}

export default SupUsers;
