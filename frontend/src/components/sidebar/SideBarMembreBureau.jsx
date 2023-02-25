import React from "react";

function SideBarMembreBureau() {
  return (
    <div className="sideBarMembreBureau">
      <h1 className="rounded-3xl text-1xl text-center text-green font-semibold p-3 md:text-start md:pl-12">
        Espace membre du bureau
      </h1>
      <div className="md:w-60 md:w-56 border pt-2 pb-2 border-black hover:scale-105 duration-300 rounded-3xl shadow-lg lg:max-w-lg mt-3 mx-8">
        <h2 className="rounded-3xl text-1xl text-center text-green font-semibold p-3 md:text-start md:pl-20">
          Comptes
        </h2>
        <div className="flex flex-col mx-3">
          <div className="flex flex-row justify-around items-center my-3">
            <button
              className="rounded-full p-2 bg-orange text-white font-bold w-3/4 md:w-3/4"
              type="button"
            >
              Compte journalier
            </button>
          </div>
          <div className="flex flex-row justify-around items-center my-3">
            <button
              className="rounded-full p-2 bg-orange text-white font-bold w-3/4 md:w-3/4"
              type="button"
            >
              caisse
            </button>
          </div>
        </div>
      </div>
      <div className="md:w-60 md:w-56 border pt-2 pb-2 border-black hover:scale-105 duration-300 rounded-3xl shadow-lg lg:max-w-lg mt-3 mx-8">
        <h2 className="rounded-3xl text-1xl text-center text-green font-semibold p-3 md:text-start md:pl-20">
          Rapports
        </h2>
        <div className="flex flex-col mx-3">
          <div className="flex flex-row justify-around items-center my-3">
            <button
              className="rounded-full p-2 bg-orange text-white font-bold w-3/4 md:w-3/4"
              type="button"
            >
              Comptes
            </button>
          </div>
          <div className="flex flex-row justify-around items-center my-3">
            <button
              className="rounded-full p-2 bg-orange text-white font-bold w-3/4 md:w-3/4"
              type="button"
            >
              Bilan
            </button>
          </div>
          <div className="flex flex-row justify-around items-center my-3">
            <button
              className="rounded-full p-2 bg-orange text-white font-bold w-3/4 md:w-3/4"
              type="button"
            >
              Projet
            </button>
          </div>
          <div className="flex flex-row justify-around items-center my-3">
            <button
              className="rounded-full p-2 bg-orange text-white font-bold w-3/4 md:w-3/4"
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

export default SideBarMembreBureau;
