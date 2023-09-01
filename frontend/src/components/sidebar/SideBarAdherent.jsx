import React, { useState } from "react";

function SideBarAdherent() {
  const [selectedMenu, setSelectedMenu] = useState(1);
  const selectBtn = (id) => {
    setSelectedMenu(id);
  };
  return (
    <div className="md:h-[calc(100vh-148px)]">
      <h1 className="h1sidebar text-1xl md:text-start md:pl-24">
        Espace adhèrent
      </h1>
      <div className="card">
        <div className="flex flex-col mx-3">
          <div className="flex flex-row justify-around items-center my-3">
            <button
              className={`btnCustom ${
                selectedMenu === 1 ? "btnCustumFocus" : ""
              }`}
              type="button"
              data-testid="btn-bilanAnnuel"
              onClick={() => selectBtn(1)}
            >
              Bilan Annuel
            </button>
          </div>
          <div className="flex flex-row justify-around items-center my-3">
            <button
              className={`btnCustom ${
                selectedMenu === 2 ? "btnCustumFocus" : ""
              }`}
              type="button"
              data-testid="btn-bilanProjet"
              onClick={() => selectBtn(2)}
            >
              Bilan Projet
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

export default SideBarAdherent;
