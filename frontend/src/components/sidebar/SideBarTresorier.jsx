import React from "react";

function SideBarTresorier() {
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
            >
              Enregistrer une recette
            </button>
          </div>
          <div className="flex flex-row justify-around items-center my-3">
            <button
              className="rounded-3xl p-2 bg-orange text-white font-bold w-1/2 md:w-3/4"
              type="button"
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
    </div>
  );
}

export default SideBarTresorier;
