import React, { useState, useEffect } from "react";
import apiConnexion from "../services/apiConnexion";

function TableauCompte({ nCompte, updateChild, nb }) {
  const [activat, setActivat] = useState("oui");
  const updateActive = (id, active) => {
    let val = "";
    // eslint-disable-next-line no-unused-expressions
    active === "non" ? (val = "oui") : (val = "non");
    apiConnexion
      .put(`/compteActive/${id}`, { actif: val })
      .then((data) => {
        setActivat(data);
        updateChild();
      })
      .catch((error) => console.error(error));
  };
  useEffect(() => {}, [activat]);

  return (
    <div className="tableauCompte">
      <h2 className="h2compo grow md:text-center m-1 mt-5 md:text-xl">
        Classe {nb}
      </h2>
      <div className="tableau flex justify-center">
        <table className=" m-2 border-collapse border-2 text-xs text-center">
          <thead>
            <tr>
              <th className="p-2 border border-2 w-20">Numéro de compte</th>
              <th className="p-2 border border-2 w-96">Intitulé du compte</th>
              <th className="p-2 border border-2">Actif</th>
            </tr>
          </thead>
          {nCompte
            .filter((compte) => compte.numero.toString().startsWith(nb))
            .map((compte) => (
              <tr key={compte.id}>
                <td className="border px-4 py-2">{compte.numero}</td>
                <td className="border px-4 py-2">{compte.designation}</td>
                <td className="border px-4 py-2">
                  <button
                    className="underline"
                    type="button"
                    onClick={() => updateActive(compte.id, compte.actif)}
                  >
                    {compte.actif}
                  </button>
                </td>
              </tr>
            ))}
        </table>
      </div>
    </div>
  );
}

export default TableauCompte;
