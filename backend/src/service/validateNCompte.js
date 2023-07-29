const Joi = require("joi");
// ajouter au service
const validate = (data) => {
  return Joi.object({
    id: Joi.number().presence("optional"),
    numero: Joi.number().presence("required"),
    designation: Joi.string().min(2).presence("required"),
    actif: Joi.string().min(2).presence("required"),
  }).validate(data, { aborEarly: false }).error;
};
module.exports = validate;
