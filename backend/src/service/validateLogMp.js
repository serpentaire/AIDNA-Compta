const Joi = require("joi");
// ajouter au service
const validateLogMp = (data) => {
  return Joi.object({
    login: Joi.string()
      .email({
        minDomainSegments: 2,
        tlds: { allow: ["com", "fr", "net", "ne"] },
      })
      .pattern(/^[^@]*@[^@]*$/)
      .required(),
    mot_pass: Joi.string().min(8).max(25).required(),
  }).validate(data, { aborEarly: false }).error;
};
module.exports = validateLogMp;
