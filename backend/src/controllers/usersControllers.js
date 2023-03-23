const prisma = require("../models/prisma");
const { hashNewPassword } = require("../service/auth");

const browse = async (req, res) => {
  try {
    const users = await prisma.Users.findMany();
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
};

const read = async (req, res) => {
  try {
    const users = await prisma.Users.findUnique({
      where: { id: +req.params.id },
    });
    if (users) {
      res.status(200).json(users);
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
    await prisma.Users.update({
      where: { id: +req.params.id },
      data: req.body,
    });
    res.status(204).json({ message: "L'utilisateur' a bien été modifié" });
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
};

const add = async (req, res) => {
  const users = req.body;
  const newLogin = users.login;
  const motPass = users.mot_pass;
  const motPasshashed = await hashNewPassword(motPass);
  delete users.login;
  delete users.mot_pass;
  users.code_postal = parseInt(users.code_postal, 10);
  users.telephone = parseInt(users.telephone, 10);
  users.role_id = parseInt(users.role_id, 10);

  try {
    const usersLog = await prisma.Users_log.create({
      data: { login: newLogin, hashedpassword: motPasshashed },
    });

    await prisma.Users.create({
      data: { ...users, users_log_id: usersLog.id },
    });

    res.status(201).json({ message: "Nouveau utilisateur créé" });
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
};

const destroy = async (req, res) => {
  try {
    await prisma.Users.delete({
      where: { id: parseInt(req.params.id, 10) },
    });
    res.status(200).json({ message: "Utilisateur supprimé" });
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
