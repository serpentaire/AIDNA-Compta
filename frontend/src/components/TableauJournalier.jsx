import React, { useEffect, useState } from "react";
import apiConnexion from "../services/apiConnexion";
import Enregistrement from "./Enregistrement";

function TableauJournalier() {
  const mois = [
    { moi: "Janvier", id: "01" },
    { moi: "Février", id: "02" },
    { moi: "Mars", id: "03" },
    { moi: "Avril", id: "04" },
    { moi: "Mai", id: "05" },
    { moi: "Juin", id: "06" },
    { moi: "Juillet", id: "07" },
    { moi: "Aout", id: "08" },
    { moi: "Septembre", id: "09" },
    { moi: "Octobre", id: "10" },
    { moi: "Novembre", id: "11" },
    { moi: "Décembre", id: "12" },
  ];
  const [enregistrementMois, setEnregistrementMois] = useState([]);
  const date1 = "2023";
  const [date2, setDate2] = useState("01");
  const [idUpdate, setIdUpdate] = useState();
  const [validat, setValidat] = useState("oui");
  const getenregistrement = () => {
    apiConnexion
      .get(`/compteJournalier?date1=${date1}&date2=${date2}`)
      .then((allData) => {
        setEnregistrementMois(allData.data);
      })
      .catch((error) => console.error(error));
  };

  const sousTotal = (enr) => {
    const ssTotalRecette = enregistrementMois
      .filter((rec) => rec.enregmt === enr)
      .reduce((acc, currentValue) => {
        return acc + parseFloat(currentValue.somme, 10);
      }, 0);
    return ssTotalRecette;
  };
  const total = () => {
    return sousTotal("recette") - sousTotal("dépense");
  };
  const selectMois = (moiId) => {
    setDate2(moiId);
  };

  const updateEnrgmt = (id) => {
    setIdUpdate(id);
  };

  const updateValidation = (id, validation) => {
    let val = "";
    // eslint-disable-next-line no-unused-expressions
    validation === "non" ? (val = "oui") : (val = "non");
    apiConnexion
      .put(`/enregistrementValidation/${id}`, { validation: val })
      .then((data) => {
        setValidat(data);
      })
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    getenregistrement();
  }, [date2, idUpdate, validat]);

  return (
    <div className="tableauJournalier">
      <div className=" m-3 md:justify-start">
        {mois.map((moi) => (
          <button
            className="focus:bg-white focus:text-orange m-2 border border-orange rounded-3xl p-2 bg-orange text-white font-bold md:w-26"
            type="button"
            onClick={() => selectMois(moi.id)}
          >
            {moi.moi}
          </button>
        ))}
      </div>
      <table className=" m-5 border-collapse border-2 text-xs">
        <thead>
          <tr>
            <th className="p-2 border border-2 w-2">Jour</th>
            <th className="p-2 border border-2 w-96">Détail de l'opération</th>
            <th className="p-2 border border-2">Mode de paiement</th>
            <th className="p-2 border border-2">Chèque (N°)</th>
            <th className="p-2 border border-2 w-32">Banque</th>
            <th className="p-2 border border-2 w-96">Compte</th>
            <th className="p-2 border border-2 w-52">Nom-prénom</th>
            <th className="p-2 border border-2">Recette</th>
            <th className="p-2 border border-2">Dépense</th>
            <th className="p-2 border border-2 w-2">Validé</th>
          </tr>
        </thead>
        <tbody>
          {enregistrementMois.map((enregistrementJour) => (
            <tr key={enregistrementJour.id}>
              <td className="border px-4 py-2">
                <button
                  className="underline"
                  type="button"
                  onClick={() => updateEnrgmt(enregistrementJour.id)}
                >
                  {enregistrementJour.date.split("T").shift().substr(-2)}
                </button>
              </td>
              <td className="border px-4 py-2">
                {enregistrementJour.description}
              </td>
              <td className="border px-4 py-2">
                {enregistrementJour.mode_pay.nom}
              </td>
              <td className="border px-4 py-2">
                {enregistrementJour.N_cheque}
              </td>
              <td className="border px-4 py-2">
                {enregistrementJour.banque ? enregistrementJour.banque.nom : ""}
              </td>
              <td className="border px-4 py-2">
                {enregistrementJour.N_comptes.designation}
              </td>
              <td className="border px-4 py-2">{enregistrementJour.nom}</td>
              {enregistrementJour.enregmt === "recette" ? (
                <td className="border text-right px-4 py-2">
                  {parseFloat(enregistrementJour.somme, 10).toFixed(2)}€
                </td>
              ) : (
                <td className="border px-4 py-2" />
              )}
              {enregistrementJour.enregmt === "dépense" ? (
                <td className="border text-right px-4 py-2">
                  {parseFloat(enregistrementJour.somme, 10).toFixed(2)}€
                </td>
              ) : (
                <td className="border px-4 py-2" />
              )}
              <td className="border px-4 py-2">
                <button
                  className="underline"
                  type="button"
                  onClick={() =>
                    updateValidation(
                      enregistrementJour.id,
                      enregistrementJour.validation
                    )
                  }
                >
                  {enregistrementJour.validation}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td className="border text-right px-4 py-2" colSpan="7">
              Total
            </td>
            <td className="border text-right border-t-2 px-4 py-2">
              {sousTotal("recette").toFixed(2)}€
            </td>
            <td className="border border-t-2 px-4 py-2">
              {sousTotal("dépense").toFixed(2)}€
            </td>
          </tr>
          <tr>
            <td className="border text-right px-4 py-2" colSpan="8">
              Solde
            </td>
            <td className="border text-center border-4 px-4 py-2" colSpan="2">
              {total().toFixed(2)}€
            </td>
          </tr>
        </tfoot>
      </table>
      {idUpdate && (
        <div>
          <Enregistrement idUpdate={idUpdate} setIdUpdate={setIdUpdate} />
        </div>
      )}
    </div>
  );
}

export default TableauJournalier;
