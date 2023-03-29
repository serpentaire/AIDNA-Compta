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
        <TableauCompte nCompte={nCompte} updateChild={getNcompte} nb="1" />
        <TableauCompte nCompte={nCompte} updateChild={getNcompte} nb="2" />
        <TableauCompte nCompte={nCompte} updateChild={getNcompte} nb="3" />
        <TableauCompte nCompte={nCompte} updateChild={getNcompte} nb="4" />
        <TableauCompte nCompte={nCompte} updateChild={getNcompte} nb="5" />
        <TableauCompte nCompte={nCompte} updateChild={getNcompte} nb="6" />
        <TableauCompte nCompte={nCompte} updateChild={getNcompte} nb="7" />
        <TableauCompte nCompte={nCompte} updateChild={getNcompte} nb="8" />
      </div>
    </div>
  );
}

export default NumCompte;
