import React from "react";

function SideBarMembreBureau() {
  return (
    <div className="sideBarMembreBureau">
      <h1 className="h1sidebar text-1xl md:text-start md:pl-12">
        Espace membre du bureau
      </h1>
      <div className="card">
        <h2 className="h2sidebar text-1xl md:text-start md:pl-20">Comptes</h2>
        <div className="flex flex-col mx-3">
          <div className="flex flex-row justify-around items-center my-3">
            <button className="btnCustom btnCustumFocus" type="button">
              Compte journalier
            </button>
          </div>
          <div className="flex flex-row justify-around items-center my-3">
            <button className="btnCustom btnCustumFocus" type="button">
              caisse
            </button>
          </div>
        </div>
      </div>
      <div className="card">
        <h2 className="h2sidebar text-1xl md:text-start md:pl-20">Rapports</h2>
        <div className="flex flex-col mx-3">
          <div className="flex flex-row justify-around items-center my-3">
            <button className="btnCustom btnCustumFocus" type="button">
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

export default SideBarMembreBureau;
