const prisma = require("../models/prisma");

const browse = async (req, res) => {
  try {
    const modepay = await prisma.mode_pay.findMany();
    res.status(200).json(modepay);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
};

module.exports = {
  browse,
};
