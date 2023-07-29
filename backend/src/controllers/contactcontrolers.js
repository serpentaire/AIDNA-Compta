const sendMail = require("./emailControllers");

const add = async (req, res) => {
  const contact = req.body;
  const email = {
    name: contact.nom,
    prenom: contact.prenom,
    email: contact.email,
    message: contact.message,
  };

  const mailOptions = {
    from: contact.email, // this is adresse of transmitter
    to: "glemoine@hotmail.fr", // this is the address to which the email will be sent : association.aidna@wanadoo.fr
    subject: `Contact de ${email.prenom} ${email.name}`,
    attachments: [
      {
        filename: "Logo.png",
        path: "public/assets/images/Logo.png",
        cid: "logo",
      },
    ],

    text: `${email.message} \n\n Name: ${email.name} \n\n Email: ${email.email} \n\n Prenom: ${email.prenom}`,
    html: `<p>Bonjour,</p> <p>Mme/Mr ${email.prenom} ${email.name} a laissé le message suivant:</p><p>${email.message}</p><p>Email: ${email.email}</p><p>Cordialement</p> <img src="cid:logo" height="100" />`,
  };
  sendMail(mailOptions);
  res.status(200).json({ message: "Email envoyé" });
};

module.exports = {
  add,
};
