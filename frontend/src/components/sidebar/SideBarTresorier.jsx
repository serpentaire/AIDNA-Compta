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
      <h1 className="h1sidebar text-1xl">
        Espace Présidente, Secrétaire et Trésorier
      </h1>
      <div className="card">
        <h2 className="h2sidebar text-1xl">Saisies</h2>
        <div className="flex flex-col mx-3">
          <div className="flex flex-row justify-around items-center my-3">
            <button
              className="btnCustom btnCustumFocus"
              type="button"
              onClick={() => setManageRedirect("/homeTresorier", "recette")}
            >
              Enregistrer une recette
            </button>
          </div>
          <div className="flex flex-row justify-around items-center my-3">
            <button
              className="btnCustom btnCustumFocus"
              type="button"
              onClick={() => setManageRedirect("/homeTresorier", "dépense")}
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
              className="btnCustom btnCustumFocus"
              type="button"
              onClick={() => setManageRedirect("/compteJournalier")}
            >
              Compte journalier
            </button>
          </div>
          <div className="flex flex-row justify-around items-center my-3">
            <button className="btnCustom btnCustumFocus" type="button">
              Caisse
            </button>
          </div>
          <div className="flex flex-row justify-around items-center my-3">
            <button className="btnCustom btnCustumFocus" type="button">
              PayPal
            </button>
          </div>
          <div className="flex flex-row justify-around items-center my-3">
            <button className="btnCustom btnCustumFocus" type="button">
              Etat de rapprochement banquaire
            </button>
          </div>
          <div className="flex flex-row justify-around items-center my-3">
            <button className="btnCustom btnCustumFocus" type="button">
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
              className="btnCustom btnCustumFocus"
              type="button"
              onClick={() => setManageRedirect("/rapportComptes")}
            >
              Comptes
            </button>
          </div>
          <div className="flex flex-row justify-around items-center my-3">
            <button className="btnCustom btnCustumFocus" type="button">
              Bilan
            </button>
          </div>
          <div className="flex flex-row justify-around items-center my-3">
            <button className="btnCustom btnCustumFocus" type="button">
              Projet
            </button>
          </div>
          <div className="flex flex-row justify-around items-center my-3">
            <button className="btnCustom btnCustumFocus" type="button">
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
