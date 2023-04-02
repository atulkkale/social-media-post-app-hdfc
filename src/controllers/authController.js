const User = require('../models/user');
const Joi = require('joi');
const utils = require('../helpers/utils');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.login = async (req, res) => {
  try {
    // Edge case
    if (req.body.password) req.body.password = String(req.body.password);
    // Validation
    const validationSchema = Joi.object().keys({
      email: Joi.string().email().required(),
      password: Joi.string().min(4).max(18).required(),
    });

    const validationSchemaOpt = { abortEarly: false };
    const validationResult = utils.validateData(
      validationSchema,
      req.body,
      validationSchemaOpt
    );
    if (validationResult) {
      return res.status(403).json(utils.responseMsg(validationResult));
    }
    // Log in
    req.body.email = req.body.email.toLowerCase();
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(404).json(utils.responseMsg('User not found!'));
    }
    const authenticatedUser = await bcrypt.compare(password, user.password);
    if (!authenticatedUser) {
      return res.status(401).json(utils.responseMsg('Password not matched!'));
    }
    // Generate JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: 600,
    });
    const resMessage = {
      message: 'Login successful',
      token: token,
    };
    return res.status(200).json(utils.responseMsg(null, true, resMessage));
  } catch (error) {
    console.log(error);
    return res.status(500).json(utils.responseMsg(error.message));
  }
};
