import React, { useEffect, useState } from "react";
import apiConnexion from "../services/apiConnexion";
import TableauCompte from "./TableauCompte";

function NumCompte() {
  const [nCompte, setNcompte] = useState([]);

  const getNcompte = () => {
    apiConnexion
      .get(`/nComptes`)
      .then((allCompte) => {
        setNcompte(allCompte.data);
      })
      .catch((error) => console.error(error));
  };
  useEffect(() => {
    getNcompte();
  }, []);

  return (
    <div className="numCompte">
      <div>
        <h1 className="h1compo">Liste des comptes</h1>
        <div data-testid="TableauCompte1">
          <TableauCompte nCompte={nCompte} updateChild={getNcompte} nb="1" />
        </div>
        <div data-testid="TableauCompte2">
          <TableauCompte nCompte={nCompte} updateChild={getNcompte} nb="2" />
        </div>
        <div data-testid="TableauCompte3">
          <TableauCompte nCompte={nCompte} updateChild={getNcompte} nb="3" />
        </div>
        <div data-testid="TableauCompte4">
          <TableauCompte nCompte={nCompte} updateChild={getNcompte} nb="4" />
        </div>
        <div data-testid="TableauCompte5">
          <TableauCompte nCompte={nCompte} updateChild={getNcompte} nb="5" />
        </div>
        <div data-testid="TableauCompte6">
          <TableauCompte nCompte={nCompte} updateChild={getNcompte} nb="6" />
        </div>
        <div data-testid="TableauCompte7">
          <TableauCompte nCompte={nCompte} updateChild={getNcompte} nb="7" />
        </div>
        <div data-testid="TableauCompte8">
          <TableauCompte nCompte={nCompte} updateChild={getNcompte} nb="8" />
        </div>
      </div>
    </div>
  );
}

export default NumCompte;
