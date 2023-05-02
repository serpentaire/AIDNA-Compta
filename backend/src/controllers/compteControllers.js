const fs = require("fs");
const path = require("path");
const prisma = require("../models/prisma");
const validate = require("../service/validateEnregistrement");
const calculSoldeMensuel = require("../service/calculSoldeMensuel");

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
  let date3 = "";
  let date4 = req.query.date1;
  if (parseInt(req.query.date2, 10) < 12) {
    date3 = (parseInt(req.query.date2, 10) + 1).toString();
  } else {
    date3 = "1";
    date4 = (parseInt(req.query.date1, 10) + 1).toString();
  }
  const date1 = date3 < 10 ? `${date4}-0${date3}` : `${date4}-${date3}`;
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

  const error = validate(enregistrement);

  if (error) {
    res.status(422).send(error);
  } else {
    try {
      await prisma.compte.update({
        where: { id: +req.params.id },
        data: { ...enregistrement, facture: facturejpg },
      });
      await calculSoldeMensuel(enregistrement);
      res.status(204).json({ message: "Enregistrement a bien été modifié" });
    } catch (err) {
      console.error(err);
      res.sendStatus(500);
    }
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
  const error = validate(enregistrement);

  if (error) {
    res.status(422).send(error);
  } else {
    try {
      await prisma.compte.create({
        data: { ...enregistrement, facture: facturejpg },
      });
      await calculSoldeMensuel(enregistrement);
      res
        .status(201)
        .json({ message: "Nouvelle recette ou depense enregistrée" });
    } catch (err) {
      console.error(err);
      res.sendStatus(500);
    }
  }
};

const destroy = async (req, res) => {
  try {
    const result = await prisma.$transaction([
      prisma.compte.findUnique({
        where: { id: parseInt(req.params.id, 10) },
        select: {
          date: true,
        },
      }),
      prisma.compte.delete({
        where: { id: parseInt(req.params.id, 10) },
      }),
    ]);
    const compte = result[0];
    await calculSoldeMensuel(compte);
    res.status(200).json({ message: "Compte supprimé" });
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
};

const editValidation = async (req, res) => {
  try {
    await prisma.compte.update({
      where: { id: +req.params.id },
      data: req.body,
    });
    res.status(204).json({ message: "La validation a bien été modifié" });
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
};

const destroyfichier = (req, res) => {
  const nomFichier = req.params.nom;
  const chemindir = __dirname.split("\\").slice(0, 6).join("\\");
  const cheminFichier = path.join(chemindir, "public", "assets", nomFichier);

  fs.unlink(cheminFichier, (err) => {
    if (err) {
      console.error(err);
      res
        .status(500)
        .send({ message: "Erreur lors de la suppression du fichier" });
    } else {
      res.send({ message: "Le fichier a été supprimé avec succès" });
    }
  });
};

const distinctYear = async (req, res) => {
  try {
    const distinctYears = await prisma.compte.findMany({
      select: {
        date: true,
      },
    });
    const years = distinctYears.map((obj) => {
      return obj.date.getFullYear();
    });
    const uniqueYears = [...new Set(years)];
    res.status(200).json(uniqueYears);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  browse,
  read,
  edit,
  add,
  destroy,
  cJournalier,
  editValidation,
  destroyfichier,
  distinctYear,
};
