const prisma = require("../models/prisma");

const browse = async (req, res) => {
  try {
    const soldeMensuel = await prisma.solde_mensuel.findMany();
    res.status(200).json(soldeMensuel);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
};

module.exports = {
  browse,
};
