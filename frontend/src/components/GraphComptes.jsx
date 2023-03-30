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

function GraphComptes() {
  const [dataGraph, setDataGraph] = useState();
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
        label: "",
        data: dataGraph,
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };

  const handleCompte = (value) => {
    apiConnexion
      .get(`/enregistrement`)
      .then((dataEnregmt) => {
        const dataCompte = dataEnregmt.data.filter(
          (donne) => donne.N_comptes_id === parseInt(value, 10)
        );

        const sumByMonth = dataCompte.reduce((acc, curr) => {
          const month = new Date(curr.date).getMonth();
          acc[month] = (acc[month] || 0) + parseFloat(curr.somme);
          return acc;
        }, new Array(12).fill(0));
        setDataGraph(sumByMonth);
      })
      .catch((error) => console.error(error));
  };

  const NcompteData = async () => {
    const allCompte = await getNcompte();
    setNcompte(allCompte);
  };

  useEffect(() => {
    NcompteData();
  }, []);

  return (
    <div className="graphComptes">
      <div className=" pt-4 text-center">
        <select
          className="border border-orange rounded-full p-2 pl-5 bg-white text-orange w-3/4 md:w-1/2"
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
      {dataGraph && (
        <div className="graphique pt-5">
          <Line options={options} data={data} />;
        </div>
      )}
    </div>
  );
}

export default GraphComptes;
