import React from "react";
import { useNavigate } from "react-router-dom";
import ScrollDown from "../ScrollDown";

function SideBarTresorier() {
  const navigate = useNavigate();
  const setManageRedirect = (url, enregistrementType) => {
    navigate(url, { state: { parametre: enregistrementType } });
    ScrollDown();
  };

  return (
    <div className="sideBarTresorier overflow-y-scroll md:h-screen">
      <h1 className="rounded-3xl text-1xl text-center text-green font-semibold p-3 md:pl-2">
        Espace Présidente, Secrétaire et Trésorier
      </h1>
      <div className=" md:w-60 md:w-56 border pt-2 pb-2 border-black hover:scale-105 duration-300 rounded-3xl shadow-lg lg:max-w-lg mt-3 mx-8">
        <h2 className="rounded-3xl text-1xl text-center text-green font-semibold p-3">
          Saisies
        </h2>
        <div className="flex flex-col mx-3">
          <div className="flex flex-row justify-around items-center my-3">
            <button
              className="rounded-3xl p-2 bg-orange text-white font-bold w-1/2 md:w-3/4"
              type="button"
              onClick={() => setManageRedirect("/homeTresorier", "recette")}
            >
              Enregistrer une recette
            </button>
          </div>
          <div className="flex flex-row justify-around items-center my-3">
            <button
              className="rounded-3xl p-2 bg-orange text-white font-bold w-1/2 md:w-3/4"
              type="button"
              onClick={() => setManageRedirect("/homeTresorier", "dépense")}
            >
              Enregistrer une dépense
            </button>
          </div>
        </div>
      </div>
      <div className="md:w-60 md:w-56 border pt-2 pb-2 border-black hover:scale-105 duration-300 rounded-3xl shadow-lg lg:max-w-lg mt-3 mx-8">
        <h2 className="rounded-3xl text-1xl text-center text-green font-semibold p-3">
          Comptes
        </h2>
        <div className="flex flex-col mx-3">
          <div className="flex flex-row justify-around items-center my-3">
            <button
              className="rounded-3xl p-2 bg-orange text-white font-bold w-1/2 md:w-3/4"
              type="button"
              onClick={() => setManageRedirect("/compteJournalier")}
            >
              Compte journalier
            </button>
          </div>
          <div className="flex flex-row justify-around items-center my-3">
            <button
              className="rounded-3xl p-2 bg-orange text-white font-bold w-1/2 md:w-3/4"
              type="button"
            >
              Caisse
            </button>
          </div>
          <div className="flex flex-row justify-around items-center my-3">
            <button
              className="rounded-3xl p-2 bg-orange text-white font-bold w-1/2 md:w-3/4"
              type="button"
            >
              PayPal
            </button>
          </div>
          <div className="flex flex-row justify-around items-center my-3">
            <button
              className="rounded-3xl p-2 bg-orange text-white font-bold w-1/2 md:w-3/4"
              type="button"
            >
              Etat de rapprochement banquaire
            </button>
          </div>
          <div className="flex flex-row justify-around items-center my-3">
            <button
              className="rounded-3xl p-2 bg-orange text-white font-bold w-1/2 md:w-3/4"
              type="button"
            >
              Stocks
            </button>
          </div>
        </div>
      </div>
      <div className="md:w-60 md:w-56 border pt-2 pb-2 border-black hover:scale-105 duration-300 rounded-3xl shadow-lg lg:max-w-lg mt-3 mx-8">
        <h2 className="rounded-3xl text-1xl text-center text-green font-semibold p-3">
          Rapports
        </h2>
        <div className="flex flex-col mx-3">
          <div className="flex flex-row justify-around items-center my-3">
            <button
              className="rounded-3xl p-2 bg-orange text-white font-bold w-1/2 md:w-3/4"
              type="button"
              onClick={() => setManageRedirect("/rapportComptes")}
            >
              Comptes
            </button>
          </div>
          <div className="flex flex-row justify-around items-center my-3">
            <button
              className="rounded-3xl p-2 bg-orange text-white font-bold w-1/2 md:w-3/4"
              type="button"
            >
              Bilan
            </button>
          </div>
          <div className="flex flex-row justify-around items-center my-3">
            <button
              className="rounded-3xl p-2 bg-orange text-white font-bold w-1/2 md:w-3/4"
              type="button"
            >
              Projet
            </button>
          </div>
          <div className="flex flex-row justify-around items-center my-3">
            <button
              className="rounded-3xl p-2 bg-orange text-white font-bold w-1/2 md:w-3/4"
              type="button"
            >
              Analyse des comptes
            </button>
          </div>
        </div>
      </div>
      <div id="cible" />
    </div>
  );
}

export default SideBarTresorier;
