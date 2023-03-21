const jwt = require("jsonwebtoken");
const prisma = require("../models/prisma");
const { verifyHash } = require("../service/auth");

const browse = async (req, res) => {
  try {
    const users = await prisma.Users.findMany();
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
};

const validateLogin = async (req, res) => {
  const { utilisateur } = req.body.utilisateur;
  try {
    const user = await prisma.Users.findMany({
      include: {
        Users_log: {
          select: {
            login: true,
            hashedpassword: true,
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
          login: utilisateur,
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
  browse,
};
