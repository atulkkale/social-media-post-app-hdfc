const utils = require('../helpers/utils');
const Joi = require('joi');
const User = require('../models/user');

exports.createUser = async (req, res) => {
  try {
    // Validation
    const createUserSchema = Joi.object().keys({
      name: Joi.string().lowercase().min(2).max(20).required(),
      email: Joi.string().email().required(),
      password: Joi.string().min(4).max(18).required(),
      role_id: Joi.number().integer().valid(1, 2, 3).messages({
        'any.only': `Role Id is not valid!`,
        'number.base': `Role Id is not valid!`,
        'number.integer': `Role Id is not valid!`,
      }),
    });
    const createUserSchemaOpt = { abortEarly: false };
    const validationResult = utils.validateData(
      createUserSchema,
      req.body,
      createUserSchemaOpt
    );
    if (validationResult) {
      return res.status(403).json(utils.responseMsg(validationResult));
    }
    // Checking if user already exists
    const { email } = req.body;
    const hasUser = await User.findOne({ email: email });
    if (hasUser) {
      return res.status(409).json(utils.responseMsg('User already exists!'));
    }
    // Create User
    await User.create(req.body);
    res.status(200).json({ result: 'User created successfully' });
  } catch (error) {
    console.log(error);
    return res.status(500).json(utils.responseMsg(error.message));
  }
};

exports.getUserInfo = async (req, res) => {
  res.json({ message: 'User info fetched successfully' });
};
