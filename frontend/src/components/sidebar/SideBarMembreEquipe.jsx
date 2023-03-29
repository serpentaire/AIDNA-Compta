import React from "react";

function SideBarMembreEquipe() {
  return (
    <div>
      <h1 className="h1sidebar text-1xl  md:text-start md:pl-14">
        Espace membre d'équipe
      </h1>
      <div className="card">
        <div className="flex flex-col mx-3">
          <div className="flex flex-row justify-around items-center my-3">
            <button className="btnCustom btnCustumFocus" type="button">
              Comptes
            </button>
          </div>
          <div className="flex flex-row justify-around items-center my-3">
            <button className="btnCustom btnCustumFocus" type="button">
              Bilan Annuel
            </button>
          </div>
          <div className="flex flex-row justify-around items-center my-3">
            <button className="btnCustom btnCustumFocus" type="button">
              Bilan Projet
            </button>
          </div>
        </div>
      </div>
      <div id="cible" />
    </div>
  );
}

export default SideBarMembreEquipe;
