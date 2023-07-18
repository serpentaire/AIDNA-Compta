const prisma = require("../models/prisma");
const { hashNewPassword } = require("../service/auth");
const sendMail = require("./emailControllers");

const getNewMp = async (req, res) => {
  try {
    const users = await prisma.Users_log.findUnique({
      where: { login: req.body.login },
      include: {
        Users: {
          select: {
            nom: true,
            prenom: true,
          },
        },
      },
    });
    if (users) {
      let password = Math.floor(Math.random() * 1000000).toString();
      password = `@idNa${password}!`;
      const email = {
        login: users.login,
        mp: password,
        message: "Voici votre nouveau mot de passe.",
        nom: users.Users[0].nom,
        prenom: users.Users[0].prenom,
      };
      const motPasshashed = await hashNewPassword(password);
      await prisma.Users_log.update({
        where: { id: users.id },
        data: { hashedpassword: motPasshashed, nb_connexion: 1 },
      });
      const mailOptions = {
        from: "association.aidna@wanadoo.fr",
        to: "glemoine@hotmail.fr", // this is the address to which the email will be sent
        subject: "Nouveau message de l'AIDNA",
        attachments: [
          {
            filename: "Logo.png",
            path: "public/assets/images/Logo.png",
            cid: "logo",
          },
        ],
        text: `Message: ${email.message} \n\n Login: ${email.login} \n\n mp: ${email.mp} \n\n nom: ${email.nom} \n\n prenom: ${email.prenom}`,
        html: `<p>Bonjour ${email.prenom},</p> <p>${email.message}</p> <p>Pour vous connecter à AIDNA_COMPTA</p><p>Login : ${email.login}</p><p>Mot de passe : ${email.mp}</p><p>Vous serez inviter à changer votre mot de passe lors de votre première connexion.</p><p>Votre mot de passe devra contenir au moins une lettre minuscule, une lettre majuscule, un chiffre et un caractère spécial parmi #$+=!*()@%&. De plus sa longueur devra être comprise entre 8 et 25 caractères.</p><p>Cordialement</p> <img src="cid:logo" height="100" />`,
      };
      sendMail(mailOptions);
      res.status(201).json({ message: "Nouveau mot de passe envoyé" });
    } else {
      res.sendStatus(404);
    }
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
};

module.exports = {
  getNewMp,
};
