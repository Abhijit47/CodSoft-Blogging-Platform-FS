const Joi = require('joi');

const signUpValidation = (data) => {
  const schema = Joi.object({
    name: Joi.string()
      .min(3)
      .max(30)
      .trim()
      .required(),
    email: Joi.string()
      .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'org', 'in'] } })
      .trim()
      .required(),
    password: Joi.string()
      .min(8)
      .max(1024)
      .trim()
      .required()
  });

  return schema.validateAsync(data);
};

const signInValidation = (data) => {
  const schema = Joi.object({
    email: Joi.string()
      .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'org', 'in'] } })
      .trim()
      .required(),
    password: Joi.string()
      .min(8)
      .max(1024)
      .trim()
      .required()
  });

  return schema.validateAsync(data);
};

module.exports = { signUpValidation, signInValidation };