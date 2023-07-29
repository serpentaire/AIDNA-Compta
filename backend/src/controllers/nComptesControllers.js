const prisma = require("../models/prisma");
const validate = require("../service/validateNCompte");

const browse = async (req, res) => {
  try {
    const nComptes = await prisma.N_comptes.findMany({
      orderBy: {
        numero: "asc",
      },
    });
    res.status(200).json(nComptes);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
};

const comptesActif = async (req, res) => {
  try {
    const nComptes = await prisma.N_comptes.findMany({
      where: { actif: "oui" },
      orderBy: {
        numero: "asc",
      },
    });
    res.status(200).json(nComptes);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
};

const read = async (req, res) => {
  try {
    const nComptes = await prisma.N_comptes.findUnique({
      where: { id: +req.params.id },
    });
    if (nComptes) {
      res.status(200).json(nComptes);
    } else {
      res.sendStatus(404);
    }
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
};

const edit = async (req, res) => {
  const error = validate(req.body);

  if (error) {
    res.status(422).send(error);
  } else {
    try {
      await prisma.N_comptes.update({
        where: { id: +req.params.id },
        data: req.body,
      });
      res.status(204).json({ message: "Le compte a bien été modifié" });
    } catch (err) {
      console.error(err);
      res.sendStatus(500);
    }
  }
};

const add = async (req, res) => {
  const error = validate(req.body);

  if (error) {
    res.status(422).send(error);
  } else {
    try {
      await prisma.N_comptes.create({
        data: req.body,
      });
      res.status(201).json({ message: "Nouveau compte créé" });
    } catch (err) {
      console.error(err);
      res.sendStatus(500);
    }
  }
};

const destroy = async (req, res) => {
  try {
    await prisma.N_comptes.delete({
      where: { id: parseInt(req.params.id, 10) },
    });
    res.status(200).json({ message: "Compte supprimé" });
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
};

const editActive = async (req, res) => {
  try {
    await prisma.N_comptes.update({
      where: { id: +req.params.id },
      data: req.body,
    });
    res.status(204).json({ message: "L'activation a bien été modifié" });
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
  editActive,
  comptesActif,
};
