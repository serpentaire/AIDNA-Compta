const Joi = require("joi");
// ajouter au service
const validate = (data) => {
  return Joi.object({
    id: Joi.number().presence("optional"),
    date: Joi.string().presence("required"),
    description: Joi.string().min(10).presence("required"),
    nom: Joi.string().min(3).max(40).presence("required"),
    somme: Joi.number().presence("required"),
    validation: Joi.string().max(5).presence("required"),
    N_comptes_id: Joi.number().presence("required"),
    N_cheque: Joi.number().allow(null).presence("optional"),
    banque_id: Joi.number().allow(null).presence("optional"),
    mode_pay_id: Joi.number().max(10).presence("required"),
    enregmt: Joi.string().min(3).max(10).presence("required"),
    facture: Joi.string().allow("").max(255).presence("optional"),
  }).validate(data, { aborEarly: false }).error;
};
module.exports = validate;
