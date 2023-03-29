import React from "react";
import { useNavigate } from "react-router-dom";
import ScrollDown from "../ScrollDown";

function SideBarAdmin() {
  const navigate = useNavigate();
  const setManageRedirect = (url, enregistrementType) => {
    navigate(url, { state: { parametre: enregistrementType } });
    ScrollDown();
  };

  return (
    <div className="sideBarAdmin">
      <h1 className="h1sidebar text-1xl md:text-start md:pl-16">
        Espace Administrateur
      </h1>
      {/* compte */}
      <div className="card">
        <h2 className="h2sidebar text-1xl">Comptes</h2>
        <div className="flex flex-col mx-3">
          <div className="flex flex-row justify-around items-center my-3">
            <button
              className="btnCustom btnCustumFocus btnCustumFocus"
              type="button"
              onClick={() => setManageRedirect("/homeAdmin")}
            >
              Archiver un compte
            </button>
          </div>
          <div className="flex flex-row justify-around items-center my-3">
            <button className="btnCustom btnCustumFocus" type="button">
              Ajouter un compte
            </button>
          </div>
        </div>
      </div>
      {/* login */}
      <div className="card">
        <h2 className="h2sidebar text-1xl">Login</h2>
        <div className="flex flex-col mx-3">
          <div className="flex flex-row justify-around items-center my-3">
            <button
              className="btnCustom btnCustumFocus"
              type="button"
              onClick={() => setManageRedirect("/adminUtilisateur", "Ajouter")}
            >
              Ajouter un utilisateur
            </button>
          </div>
          <div className="flex flex-row justify-around items-center my-3">
            <button className="btnCustom btnCustumFocus" type="button">
              Supprimer un utilisateur
            </button>
          </div>
          <div className="flex flex-row justify-around items-center my-3">
            <button className="btnCustom btnCustumFocus" type="button">
              Modifier un utilisateur
            </button>
          </div>
        </div>
      </div>
      {/* Administration */}
      <div className="card">
        <h2 className="h2sidebar text-1xl">Administration</h2>
        <div className="flex flex-col mx-3">
          <div className="flex flex-row justify-around items-center my-3">
            <button className="btnCustom btnCustumFocus" type="button">
              Bose de données
            </button>
          </div>
        </div>
      </div>
      <div id="cible" />
    </div>
  );
}

export default SideBarAdmin;
