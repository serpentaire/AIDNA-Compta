import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ScrollDown from "../ScrollDown";

function SideBarTresorier() {
  const [selectedMenu, setSelectedMenu] = useState(1);
  const navigate = useNavigate();
  const setManageRedirect = (url, enregistrementType) => {
    navigate(url, { state: { parametre: enregistrementType } });
    ScrollDown();
  };
  const selectBtn = (id) => {
    setSelectedMenu(id);
  };
  return (
    <div className="sideBarTresorier overflow-y-scroll md:h-screen">
      <h1 className="h1sidebar text-1xl">
        Espace Présidente, Secrétaire et Trésorier
      </h1>
      <div className="card">
        <h2 className="h2sidebar text-1xl">Saisies</h2>
        <div className="flex flex-col mx-3">
          <div className="flex flex-row justify-around items-center my-3">
            <button
              className={`btnCustom ${
                selectedMenu === 1 ? "btnCustumFocus" : ""
              }`}
              type="button"
              onClick={() => {
                setManageRedirect("/homeTresorier", "recette");
                selectBtn(1);
              }}
            >
              Enregistrer une recette
            </button>
          </div>
          <div className="flex flex-row justify-around items-center my-3">
            <button
              className={`btnCustom ${
                selectedMenu === 2 ? "btnCustumFocus" : ""
              }`}
              type="button"
              onClick={() => {
                setManageRedirect("/homeTresorier", "dépense");
                selectBtn(2);
              }}
            >
              Enregistrer une dépense
            </button>
          </div>
        </div>
      </div>
      <div className="card">
        <h2 className="h2sidebar text-1xl">Comptes</h2>
        <div className="flex flex-col mx-3">
          <div className="flex flex-row justify-around items-center my-3">
            <button
              className={`btnCustom ${
                selectedMenu === 3 ? "btnCustumFocus" : ""
              }`}
              type="button"
              onClick={() => {
                setManageRedirect("/compteJournalier");
                selectBtn(3);
              }}
            >
              Compte journalier
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
              Caisse
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
              PayPal
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
              Etat de rapprochement banquaire
            </button>
          </div>
          <div className="flex flex-row justify-around items-center my-3">
            <button
              className={`btnCustom ${
                selectedMenu === 7 ? "btnCustumFocus" : ""
              }`}
              type="button"
              onClick={() => selectBtn(7)}
            >
              Stocks
            </button>
          </div>
        </div>
      </div>
      <div className="card">
        <h2 className="h2sidebar text-1xl">Rapports</h2>
        <div className="flex flex-col mx-3">
          <div className="flex flex-row justify-around items-center my-3">
            <button
              className={`btnCustom ${
                selectedMenu === 8 ? "btnCustumFocus" : ""
              }`}
              type="button"
              onClick={() => {
                setManageRedirect("/rapportComptes");
                selectBtn(8);
              }}
            >
              Comptes
            </button>
          </div>
          <div className="flex flex-row justify-around items-center my-3">
            <button
              className={`btnCustom ${
                selectedMenu === 9 ? "btnCustumFocus" : ""
              }`}
              type="button"
              onClick={() => selectBtn(9)}
            >
              Bilan
            </button>
          </div>
          <div className="flex flex-row justify-around items-center my-3">
            <button
              className={`btnCustom ${
                selectedMenu === 10 ? "btnCustumFocus" : ""
              }`}
              type="button"
              onClick={() => selectBtn(10)}
            >
              Projet
            </button>
          </div>
          <div className="flex flex-row justify-around items-center my-3">
            <button
              className={`btnCustom ${
                selectedMenu === 11 ? "btnCustumFocus" : ""
              }`}
              type="button"
              onClick={() => selectBtn(11)}
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
