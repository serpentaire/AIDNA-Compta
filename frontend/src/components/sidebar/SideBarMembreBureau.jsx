import React, { useState } from "react";

function SideBarMembreBureau() {
  const [selectedMenu, setSelectedMenu] = useState(1);
  const selectBtn = (id) => {
    setSelectedMenu(id);
  };
  return (
    <div className="sideBarMembreBureau">
      <h1 className="h1sidebar text-1xl md:text-start md:pl-12">
        Espace membre du bureau
      </h1>
      <div className="card">
        <h2 className="h2sidebar text-1xl md:text-start md:pl-20">Comptes</h2>
        <div className="flex flex-col mx-3">
          <div className="flex flex-row justify-around items-center my-3">
            <button
              className={`btnCustom ${
                selectedMenu === 1 ? "btnCustumFocus" : ""
              }`}
              type="button"
              onClick={() => selectBtn(1)}
            >
              Compte journalier
            </button>
          </div>
          <div className="flex flex-row justify-around items-center my-3">
            <button
              className={`btnCustom ${
                selectedMenu === 2 ? "btnCustumFocus" : ""
              }`}
              type="button"
              onClick={() => selectBtn(2)}
            >
              caisse
            </button>
          </div>
        </div>
      </div>
      <div className="card">
        <h2 className="h2sidebar text-1xl md:text-start md:pl-20">Rapports</h2>
        <div className="flex flex-col mx-3">
          <div className="flex flex-row justify-around items-center my-3">
            <button
              className={`btnCustom ${
                selectedMenu === 3 ? "btnCustumFocus" : ""
              }`}
              type="button"
              onClick={() => selectBtn(3)}
            >
              Comptes
            </button>
          </div>
          <div className="flex flex-row justify-around items-center my-3">
            <button
              className={`btnCustom ${
                selectedMenu === 4 ? "btnCustumFocus" : ""
              }`}
              type="button"
              onClick={() => selectBtn(4)}
            >
              Bilan
            </button>
          </div>
          <div className="flex flex-row justify-around items-center my-3">
            <button
              className={`btnCustom ${
                selectedMenu === 5 ? "btnCustumFocus" : ""
              }`}
              type="button"
              onClick={() => selectBtn(5)}
            >
              Projet
            </button>
          </div>
          <div className="flex flex-row justify-around items-center my-3">
            <button
              className={`btnCustom ${
                selectedMenu === 6 ? "btnCustumFocus" : ""
              }`}
              type="button"
              onClick={() => selectBtn(6)}
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

export default SideBarMembreBureau;
