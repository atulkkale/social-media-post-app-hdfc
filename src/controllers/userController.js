const utils = require('../helpers/utils');
const Joi = require('joi');
const User = require('../models/user');
const mongoose = require('mongoose');

exports.createUser = async (req, res) => {
  try {
    // Edge case
    if (req.body.password) req.body.password = String(req.body.password);
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
    return res
      .status(200)
      .json(utils.responseMsg(null, true, 'User created successfully'));
  } catch (error) {
    console.log(error);
    return res.status(500).json(utils.responseMsg(error.message));
  }
};

exports.getUserInfo = async (req, res) => {
  try {
    // Validation
    const { user_id: id } = req.params;
    const isValidId = mongoose.Types.ObjectId.isValid(id);
    if (!isValidId)
      return res.status(403).json(utils.responseMsg('Invalid Request Id!'));
    // Fetching user info
    const user = await User.aggregate([
      {
        $match: {
          _id: new mongoose.Types.ObjectId(id),
        },
      },
      {
        $lookup: {
          from: 'roles',
          localField: 'role_id',
          foreignField: 'role_id',
          as: 'role',
        },
      },
      {
        $project: {
          _id: 0,
          name: 1,
          email: 1,
          role_id: 1,
          role_name: {
            $let: {
              vars: {
                role: {
                  $arrayElemAt: ['$role', 0],
                },
              },
              in: '$$role.role_name',
            },
          },
        },
      },
    ]);
    if (!user.length)
      return res.status(404).json(utils.responseMsg('User not found!'));
    return res.json(utils.responseMsg(null, true, user));
  } catch (error) {
    console.log(error);
    return res.status(500).json(utils.responseMsg(error.message));
  }
};
