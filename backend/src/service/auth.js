const argon2 = require("argon2");

const hashingOptions = {
  type: argon2.argon2id,
  memoryCost: 2 ** 16,
  timeCost: 5,
  parallelism: 1,
};

const hashPassword = (req, res, next) => {
  argon2
    .hash(req.body.hashedPassword, hashingOptions)
    .then((hashedPassword) => {
      req.body.hashedPassword = hashedPassword;
      delete req.body.mot_de_passe;

      next();
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const hashNewPassword = (password) => {
  return argon2.hash(password, hashingOptions);
};

const verifyHash = (hashFromDB, passwordSend) => {
  return argon2.verify(hashFromDB, passwordSend, hashingOptions);
};

module.exports = { hashPassword, verifyHash, hashNewPassword };
