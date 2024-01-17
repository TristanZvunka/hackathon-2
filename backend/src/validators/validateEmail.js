const Joi = require("joi");

const getEmailSchema = () => {
  return Joi.object({
    id: Joi.number().presence("optional"),
    email: Joi.string().max(255).presence("required"),
  });
};

const validateEmail = (req, res, next) => {
  const schema = getEmailSchema();

  const { error } = schema.validate(
    {
      ...req.body,
    },
    { abortEarly: false }
  );

  if (error) {
    res.status(422).json({ validationErrors: error.details });
  } else {
    next();
  }
};

module.exports = validateEmail;
