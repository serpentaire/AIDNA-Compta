import React, { useEffect, useState } from "react";
import apiConnexion from "../services/apiConnexion";
import Enregistrement from "./Enregistrement";
import icone from "../assets/ticket.png";

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
  const [annees, setAnnees] = useState([]);
  const [selectedMonthId, setSelectedMonthId] = useState("01");
  const [soldeMensuel, setSoldeMensuel] = useState([]);
  const [selectedYear, setSelectedYear] = useState(
    new Date().getFullYear().toString()
  );
  const [date2, setDate2] = useState("01");
  const [idUpdate, setIdUpdate] = useState();
  const [validat, setValidat] = useState("oui");

  const getAnnees = () => {
    apiConnexion
      .get(`/distinctYear`)
      .then((allData) => {
        setAnnees(allData.data);
      })
      .catch((error) => console.error(error));
  };

  const handleAnnees = (place, value) => {
    const newAnnee = { ...annees };
    newAnnee[place] = value;
    setSelectedYear(newAnnee.annees);
  };

  const getenregistrement = () => {
    apiConnexion
      .get(`/compteJournalier?date1=${selectedYear}&date2=${date2}`)
      .then((allData) => {
        setEnregistrementMois(allData.data);
      })
      .catch((error) => console.error(error));
  };

  const getSoldeMensuel = () => {
    apiConnexion
      .get(`/soldeMensuel`)
      .then((allData) => {
        setSoldeMensuel(allData.data);
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

  const selectMois = (moiId) => {
    setDate2(moiId);
    setSelectedMonthId(moiId);
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
    getSoldeMensuel();
    getAnnees();
  }, [date2, idUpdate, validat, selectedMonthId, selectedYear]);

  const soldeMois = () => {
    const sol = soldeMensuel.filter(
      (donne) => donne.periode === `${selectedYear}-${date2}`
    );
    return sol[0] ? sol[0].solde : 0;
  };

  return (
    <div className="tableauJournalier">
      <div className=" m-3 md:justify-start">
        {mois.map((moi) => (
          <button
            className={`btnCustom m-2 w-1/4 md:w-24 text-xs md:text-base ${
              moi.id === selectedMonthId ? "btnCustumFocus" : ""
            }`}
            type="button"
            tabIndex={moi.id}
            onClick={() => selectMois(moi.id)}
          >
            {moi.moi}
          </button>
        ))}
        <select
          className="inputCustom m-2 w-1/4 md:w-24 text-xs md:text-base"
          name="annees"
          type="text"
          onChange={(e) => handleAnnees(e.target.name, e.target.value)}
        >
          {annees.map((annee) => (
            <option key={annee} value={annee} selected={annee === annees}>
              {annee}
            </option>
          ))}
        </select>
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
                  onClick={() =>
                    idUpdate !== enregistrementJour.id
                      ? updateEnrgmt(enregistrementJour.id)
                      : setIdUpdate()
                  }
                >
                  {enregistrementJour.date.split("T").shift().substr(-2)}
                </button>
              </td>
              <td className="border px-4 py-2">
                {enregistrementJour.description}
                {enregistrementJour.facture !== "assets/null" && (
                  <button type="button" className="">
                    <a
                      href={`${import.meta.env.VITE_BACKEND_URL}/${
                        enregistrementJour.facture
                      }`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <img src={icone} alt="icone" className="w-5 h-5" />
                    </a>
                  </button>
                )}
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
              {parseFloat(soldeMois(), 10).toFixed(2)}€
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
