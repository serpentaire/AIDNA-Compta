const jwt = require("jsonwebtoken");
const prisma = require("../models/prisma");
const { verifyHash } = require("../service/auth");

const browse = async (req, res) => {
  try {
    const nComptes = await prisma.Users_log.findMany();
    res.status(200).json(nComptes);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
};

const validateLogin = async (req, res) => {
  const { utilisateur } = req.body.utilisateur;

  try {
    const user = await prisma.Users_log.findFirst({
      where: { login: utilisateur },
    });
    if (user) {
      if (await verifyHash(user.hashedpassword, req.body.password)) {
        const myUser = { ...user };
        delete myUser.hashedpassword;
        const token = jwt.sign(myUser, process.env.JWT_SECRET, {
          expiresIn: "24h",
        });

        res
          .status(201)
          .cookie("access_token", token, {
            httpOnly: true,
          })
          .json(myUser);
      } else {
        res.sendStatus(401);
      }
    } else {
      res.sendStatus(404);
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Error retrieving data from database");
  }
};

module.exports = {
  validateLogin,
  browse,
};
