const jwt = require("jsonwebtoken");
const prisma = require("../models/prisma");
const { verifyHash } = require("../service/auth");
const { hashNewPassword } = require("../service/auth");

const firstconnexion = async (req, res) => {
  const motPass = req.body.password;
  const motPasshashed = await hashNewPassword(motPass);
  try {
    const user = await prisma.Users_log.findMany({
      where: { id: +req.body.id },
    });
    if (user) {
      if (await verifyHash(user[0].hashedpassword, req.body.oldpassword)) {
        const compte = await prisma.Users_log.update({
          where: { id: +req.body.id },
          data: { hashedpassword: motPasshashed, nb_connexion: 2 },
        });
        if (compte) {
          res.status(200).json(compte);
        } else {
          res.sendStatus(404);
        }
      } else {
        res.sendStatus(401);
      }
    } else {
      res.sendStatus(404);
    }
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
};

const validateLogin = async (req, res) => {
  try {
    const user = await prisma.Users.findMany({
      include: {
        Users_log: {
          select: {
            login: true,
            hashedpassword: true,
            nb_connexion: true,
          },
        },
        Role: {
          select: {
            nom: true,
          },
        },
      },
      where: {
        Users_log: {
          login: req.body.utilisateur,
        },
      },
    });
    if (user) {
      if (
        await verifyHash(user[0].Users_log.hashedpassword, req.body.password)
      ) {
        const myUser = { ...user };
        delete myUser[0].Users_log.hashedpassword;
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
  firstconnexion,
};
