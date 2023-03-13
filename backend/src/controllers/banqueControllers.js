const prisma = require("../models/prisma");

const browse = async (req, res) => {
  try {
    const banque = await prisma.banque.findMany();
    res.status(200).json(banque);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
};

module.exports = {
  browse,
};
