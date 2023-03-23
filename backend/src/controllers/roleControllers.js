const prisma = require("../models/prisma");

const browse = async (req, res) => {
  try {
    const roles = await prisma.Role.findMany();
    res.status(200).json(roles);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
};

module.exports = {
  browse,
};
