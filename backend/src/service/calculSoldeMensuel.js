const prisma = require("../models/prisma");

async function calculSoldeMensuel(req) {
  const dateModif = new Date(req.date);
  const dateCourante = new Date();
  const moisModif = dateModif.getMonth() + 1;
  const anneeModif = dateModif.getFullYear().toString();
  const moisCourant = dateCourante.getMonth() + 1;
  const anneeCourante = dateCourante.getFullYear().toString();

  for (let annee = anneeModif; annee <= anneeCourante; annee += 1) {
    const moisDebut = annee === anneeModif ? moisModif : 1;
    const moisFin = annee === anneeCourante ? moisCourant : 12;

    for (let mois = moisDebut; mois <= moisFin; mois += 1) {
      const moisFormatte = mois < 10 ? `0${mois}` : `${mois}`;
      const dateDebut = `${annee}-${moisFormatte}`;
      const dateFin = mois === 12 ? `${annee + 1}-01` : `${annee}-${mois + 1}`;

      // eslint-disable-next-line no-await-in-loop
      const comptes = await prisma.compte.findMany({
        where: {
          date: {
            gte: new Date(dateDebut).toISOString(),
            lt: new Date(dateFin).toISOString(),
          },
        },
      });

      if (comptes.length >= 0) {
        // eslint-disable-next-line no-await-in-loop
        const soldePreced = await prisma.solde_mensuel.findMany({
          where: {
            periode: {
              lt: dateDebut,
            },
          },
          select: {
            solde: true,
          },
          orderBy: {
            periode: "desc",
          },
          take: 1,
        });

        const soldePrecedent = soldePreced[0]
          ? parseFloat(soldePreced[0].solde, 10)
          : 0;

        const total = comptes.reduce((acc, currentValue) => {
          const montant = parseFloat(currentValue.somme, 10);
          if (currentValue.enregmt === "recette") {
            return acc + montant;
          }
          return acc - montant;
        }, soldePrecedent);

        // eslint-disable-next-line no-await-in-loop
        await prisma.solde_mensuel.upsert({
          where: {
            periode: dateDebut,
          },
          update: {
            solde: parseFloat(total, 10).toFixed(2),
          },
          create: {
            periode: dateDebut,
            solde: parseFloat(total, 10).toFixed(2),
          },
        });
      }
    }
  }

  return "Solde mensuel mis à jour";
}

module.exports = calculSoldeMensuel;
