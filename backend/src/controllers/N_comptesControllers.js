const prisma = require("../models/prisma");

const browse = async (req, res) => {
 try {
  const N_comptes = await prisma.N_comptes.findMany();
  res.status(200).json(N_comptes);
 } catch (error) {
  console.error(error);
  res.sendStatus(500);
 }
};

const read = async (req, res) => {
  try {
    const N_comptes = await prisma.N_comptes.findUnique({
      where: { id : +req.params.id },
    });
    if (N_comptes) {
      res.status(200).json(N_comptes);
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
    await prisma.N_comptes.update({
      where: { id : +req.params.id },
      data: req.body,
    });
    res.status(204).json({message: "Le compte a bien été modifié"});
   } catch (error) {
    console.error(error);
    res.sendStatus(500);
   }
};

const add = async (req, res) => {
  try {
    await prisma.N_comptes.create({
      data : req.body
    });
    res.status(201).json({message: "Nouveau compte créé"});
   } catch (error) {
    console.error(error);
    res.sendStatus(500);
   }
};

const destroy = async (req, res) => {
  try {
    await prisma.N_comptes.delete({
      where: {id : parseInt(req.params.id,10)}
    });
    res.status(200).json({message: "Compte supprimé"});
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
};
