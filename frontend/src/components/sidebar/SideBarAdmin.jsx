import React from "react";
import { useNavigate } from "react-router-dom";

function SideBarAdmin() {
  const navigate = useNavigate();
  const setManageRedirect = (url, enregistrementType) => {
    navigate(url, { state: { parametre: enregistrementType } });
  };

  return (
    <div className="sideBarAdmin">
      <h1 className="rounded-3xl text-1xl text-center text-green font-semibold p-3 md:text-start md:pl-16">
        Espace Administrateur
      </h1>
      {/* compte */}
      <div className="md:w-60 md:w-56 border pt-2 pb-2 border-black hover:scale-105 duration-300 rounded-3xl shadow-lg lg:max-w-lg mt-3 mx-8">
        <h2 className="rounded-3xl text-1xl text-center text-green font-semibold p-3">
          Comptes
        </h2>
        <div className="flex flex-col mx-3">
          <div className="flex flex-row justify-around items-center my-3">
            <button
              className="rounded-3xl p-2 bg-orange text-white font-bold w-3/4 md:w-3/4"
              type="button"
              onClick={() => setManageRedirect("/homeAdmin")}
            >
              Archiver un compte
            </button>
          </div>
          <div className="flex flex-row justify-around items-center my-3">
            <button
              className="rounded-full p-2 bg-orange text-white font-bold w-3/4 md:w-3/4"
              type="button"
            >
              Ajouter un compte
            </button>
          </div>
        </div>
      </div>
      {/* login */}
      <div className="md:w-60 md:w-56 border pt-2 pb-2 border-black hover:scale-105 duration-300 rounded-3xl shadow-lg lg:max-w-lg mt-3 mx-8">
        <h2 className="rounded-3xl text-1xl text-center text-green font-semibold p-3">
          Login
        </h2>
        <div className="flex flex-col mx-3">
          <div className="flex flex-row justify-around items-center my-3">
            <button
              className="rounded-3xl p-2 bg-orange text-white font-bold w-3/4 md:w-3/4"
              type="button"
              onClick={() => setManageRedirect("/adminUtilisateur", "Ajouter")}
            >
              Ajouter un utilisateur
            </button>
          </div>
          <div className="flex flex-row justify-around items-center my-3">
            <button
              className="rounded-3xl p-2 bg-orange text-white font-bold w-3/4 md:w-3/4"
              type="button"
            >
              Supprimer un utilisateur
            </button>
          </div>
          <div className="flex flex-row justify-around items-center my-3">
            <button
              className="rounded-3xl p-2 bg-orange text-white font-bold w-3/4 md:w-3/4"
              type="button"
            >
              Modifier un utilisateur
            </button>
          </div>
        </div>
      </div>
      {/* Administration */}
      <div className="md:w-60 md:w-56 border pt-2 pb-2 border-black hover:scale-105 duration-300 rounded-3xl shadow-lg lg:max-w-lg mt-3 mx-8">
        <h2 className="rounded-3xl text-1xl text-center text-green font-semibold p-3">
          Administration
        </h2>
        <div className="flex flex-col mx-3">
          <div className="flex flex-row justify-around items-center my-3">
            <button
              className="rounded-full p-2 bg-orange text-white font-bold w-3/4 md:w-3/4"
              type="button"
            >
              Bose de données
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SideBarAdmin;
