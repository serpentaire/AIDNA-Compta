const prisma = require("../models/prisma");

const browse = async (req, res) => {
  try {
    const compte = await prisma.compte.findMany();
    res.status(200).json(compte);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
};

const read = async (req, res) => {
  try {
    const compte = await prisma.compte.findUnique({
      where: { id: +req.params.id },
    });
    if (compte) {
      res.status(200).json(compte);
    } else {
      res.sendStatus(404);
    }
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
};

const cJournalier = async (req, res) => {
  const date3 = (parseInt(req.query.date2, 10) + 1).toString();
  const date1 = `${req.query.date1}-0${date3}`;
  const date2 = `${req.query.date1}-${req.query.date2}`;

  try {
    const compte = await prisma.compte.findMany({
      where: {
        date: {
          lt: new Date(date1).toISOString(),
          gte: new Date(date2).toISOString(),
        },
      },
      include: {
        N_comptes: {
          select: {
            designation: true,
          },
        },
        banque: {
          select: {
            nom: true,
          },
        },
        mode_pay: {
          select: {
            nom: true,
          },
        },
      },
    });
    if (compte) {
      res.status(200).json(compte);
    } else {
      res.sendStatus(404);
    }
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
};

const edit = async (req, res) => {
  try {
    await prisma.compte.update({
      where: { id: +req.params.id },
      data: req.body,
    });
    res.status(204).json({ message: "Le compte a bien été modifié" });
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
};

const add = async (req, res) => {
  let enregistrement = req.body;
  const facturejpg = `assets/${
    req.files.facture ? req.files.facture[0].filename : null
  }`;
  enregistrement = JSON.parse(enregistrement.data);
  enregistrement.somme = parseFloat(enregistrement.somme, 10).toFixed(2);
  enregistrement.N_cheque = enregistrement.N_cheque
    ? parseInt(enregistrement.N_cheque, 10)
    : null;
  enregistrement.N_comptes_id = parseInt(enregistrement.N_comptes_id, 10);
  enregistrement.banque_id = enregistrement.banque_id
    ? parseInt(enregistrement.banque_id, 10)
    : null;
  enregistrement.mode_pay_id = parseInt(enregistrement.mode_pay_id, 10);
  enregistrement.date += "T00:00:00Z";

  try {
    await prisma.compte.create({
      data: { ...enregistrement, facture: facturejpg },
    });
    res
      .status(201)
      .json({ message: "Nouvelle recette ou depense enregistrée" });
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
};

const destroy = async (req, res) => {
  try {
    await prisma.compte.delete({
      where: { id: parseInt(req.params.id, 10) },
    });
    res.status(200).json({ message: "Compte supprimé" });
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
};

module.exports = {
  browse,
  read,
  edit,
  add,
  destroy,
  cJournalier,
};
