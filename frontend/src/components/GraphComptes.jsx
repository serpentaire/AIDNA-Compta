import React, { useState, useEffect } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
} from "chart.js";
import { Line } from "react-chartjs-2";
import getNcompte from "../CRUD/getNcompte";
import apiConnexion from "../services/apiConnexion";
// Ajouté la date aux écritures
function GraphComptes() {
  const [dataGraph, setDataGraph] = useState();
  const [annees, setAnnees] = useState([]);
  const [selectedCompte, setSelectedCompte] = useState(null);
  const [selectedYear, setSelectedYear] = useState(
    new Date().getFullYear().toString()
  );
  const [allDataCompte, setAllDataCompte] = useState();
  // graphique
  ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement);
  const options = {
    responsive: true,
  };
  const labels = [
    "Janvier",
    "Février",
    "Mars",
    "Avril",
    "Mai",
    "Juin,",
    "Juillet",
    "Aout",
    "Septembre",
    "Octobre",
    "Novembre",
    "Décembre",
  ];
  const [Ncompte, setNcompte] = useState([]);
  const data = {
    labels,
    datasets: [
      {
        data: dataGraph,
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };
  const getAnnees = () => {
    apiConnexion
      .get(`/distinctYear`)
      .then((allData) => {
        setAnnees(allData.data);
      })
      .catch((error) => console.error(error));
  };

  const handleCompte = (value) => {
    if (value) {
      setSelectedCompte(value);
    }
    apiConnexion
      .get(`/enregistrement`)
      .then((dataEnregmt) => {
        const dataCompte = dataEnregmt.data.filter(
          (donne) => donne.N_comptes_id === parseInt(selectedCompte, 10)
        );
        setAllDataCompte(dataCompte);
        const sumByMonth = dataCompte.reduce((acc, curr) => {
          const SelectYear = parseInt(selectedYear, 10);
          const date = new Date(curr.date);
          const month = date.getMonth();
          const currYear = date.getFullYear();
          if (currYear.toString() === SelectYear.toString()) {
            acc[month] = (acc[month] || 0) + parseFloat(curr.somme);
          }
          return acc;
        }, new Array(12).fill(0));
        setDataGraph(sumByMonth);
      })
      .catch((error) => console.error(error));
  };

  const handleAnnees = (place, value) => {
    const newAnnee = { ...annees };
    newAnnee[place] = value;
    setSelectedYear(newAnnee[place]);
  };
  const NcompteData = async () => {
    const allCompte = await getNcompte();
    setNcompte(allCompte);
  };

  useEffect(() => {
    NcompteData();
    getAnnees();
    handleCompte(selectedCompte);
  }, [selectedYear, selectedCompte]);
  return (
    <div className="graphComptes">
      <div className=" pt-4 text-center">
        <select
          className="inputCustom text-start m-2 w-1/4 md:w-24 text-xs md:text-base"
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
        <select
          className="inputCustom"
          name="N_comptes_id"
          type="text"
          onChange={(e) => handleCompte(e.target.value)}
        >
          <option value="">Sélectionnez le numero de comptes</option>
          {Ncompte.filter(
            (compte) =>
              compte.numero.toString().startsWith("7") ||
              compte.numero.toString().startsWith("6")
          ).map((compte) => (
            <option key={compte.id} value={compte.id}>
              {compte.numero} - {compte.designation}
            </option>
          ))}
        </select>
      </div>
      <div className="flex mt-10">
        <div className="flex-auto ml-5 md:ml-32">
          {allDataCompte && (
            <div>
              <h2 className="mb-4 ml-10">Recettes</h2>
              {allDataCompte
                .filter((compte) => {
                  const date = new Date(compte.date);
                  return date.getFullYear() === parseInt(selectedYear, 10);
                })
                .sort((a, b) => {
                  const dateA = new Date(a.date);
                  const dateB = new Date(b.date);
                  if (dateA.getMonth() !== dateB.getMonth()) {
                    return dateA.getMonth() - dateB.getMonth();
                  }
                  return dateA.getDate() - dateB.getDate();
                })
                .map((compte) =>
                  compte.enregmt === "recette" ? (
                    <p>
                      {compte.date.split("T").shift().substr(8)}-
                      {compte.date.split("T").shift().substr(5, 2)} /{" "}
                      {compte.description} : {compte.somme} €
                    </p>
                  ) : null
                )}
            </div>
          )}
        </div>
        <div className="flex-auto md:ml-32">
          {allDataCompte && (
            <div>
              <h2 className="mb-4 ml-10">Dépenses</h2>
              {allDataCompte
                .filter((compte) => {
                  const date = new Date(compte.date);
                  return date.getFullYear() === parseInt(selectedYear, 10);
                })
                .sort((a, b) => {
                  const dateA = new Date(a.date);
                  const dateB = new Date(b.date);
                  if (dateA.getMonth() !== dateB.getMonth()) {
                    return dateA.getMonth() - dateB.getMonth();
                  }
                  return dateA.getDate() - dateB.getDate();
                })
                .map((compte) =>
                  compte.enregmt === "dépense" ? (
                    <p>
                      {compte.date.split("T").shift().substr(8)}-
                      {compte.date.split("T").shift().substr(5, 2)} /{" "}
                      {compte.description} : {compte.somme} €
                    </p>
                  ) : null
                )}
            </div>
          )}
        </div>
      </div>
      {dataGraph && (
        <div className="graphique pt-5">
          <Line options={options} data={data} />;
        </div>
      )}
    </div>
  );
}

export default GraphComptes;
