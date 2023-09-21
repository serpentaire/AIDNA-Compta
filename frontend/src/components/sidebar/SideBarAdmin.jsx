import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ScrollDown from "../ScrollDown";

function SideBarAdmin() {
  const [selectedMenu, setSelectedMenu] = useState(1);
  const selectBtn = (id) => {
    setSelectedMenu(id);
  };
  const navigate = useNavigate();
  const setManageRedirect = (url, enregistrementType) => {
    navigate(url, { state: { parametre: enregistrementType } });
    ScrollDown();
  };

  return (
    <div className="sideBarAdmin md:h-[calc(100vh-148px)]">
      <h1 className="h1sidebar text-1xl md:text-start md:pl-16">
        Espace Administrateur
      </h1>
      {/* compte */}
      <div className="card">
        <h2 className="h2sidebar text-1xl">Comptes</h2>
        <div className="flex flex-col mx-3">
          <div className="flex flex-row justify-around items-center my-3">
            <button
              className={`btnCustom ${
                selectedMenu === 1 ? "btnCustumFocus" : ""
              }`}
              type="button"
              data-testid="btn-archiverCompte"
              onClick={() => {
                setManageRedirect("/admin/accueil");
                selectBtn(1);
              }}
            >
              Archiver un compte
            </button>
          </div>
          <div className="flex flex-row justify-around items-center my-3">
            <button
              className={`btnCustom ${
                selectedMenu === 2 ? "btnCustumFocus" : ""
              }`}
              type="button"
              data-testid="btn-ajoutCompte"
              onClick={() => selectBtn(2)}
            >
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
              className={`btnCustom ${
                selectedMenu === 3 ? "btnCustumFocus" : ""
              }`}
              type="button"
              data-testid="btn-ajoutUtilisateur"
              onClick={() => {
                setManageRedirect("/admin/utilisateurs", "Ajouter");
                selectBtn(3);
              }}
            >
              Ajouter un utilisateur
            </button>
          </div>
          <div className="flex flex-row justify-around items-center my-3">
            <button
              className={`btnCustom ${
                selectedMenu === 4 ? "btnCustumFocus" : ""
              }`}
              type="button"
              data-testid="btn-supUtilisateur"
              onClick={() => {
                setManageRedirect("/admin/utilisateurs", "Supprimer");
                selectBtn(4);
              }}
            >
              Supprimer un utilisateur
            </button>
          </div>
          <div className="flex flex-row justify-around items-center my-3">
            <button
              className={`btnCustom ${
                selectedMenu === 5 ? "btnCustumFocus" : ""
              }`}
              type="button"
              data-testid="btn-modifUtilisateur"
              onClick={() => {
                setManageRedirect("/admin/utilisateurs", "Modifier");
                selectBtn(5);
              }}
            >
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
            <button
              className={`btnCustom ${
                selectedMenu === 6 ? "btnCustumFocus" : ""
              }`}
              type="button"
              data-testid="btn-bdd"
              onClick={() => selectBtn(6)}
            >
              Base de données
            </button>
          </div>
        </div>
        <div data-testid="selected-menu" className="hidden">
          {selectedMenu}
        </div>
      </div>
      <div id="cible" />
    </div>
  );
}

export default SideBarAdmin;
