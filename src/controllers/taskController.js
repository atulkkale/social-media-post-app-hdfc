const utils = require('../helpers/utils');
const mongoose = require('mongoose');
const Joi = require('joi');
const Post = require('../models/post');

exports.createPost = async (req, res) => {
  try {
    // Validation
    const { user_id: id } = req.params;
    const isValidId = mongoose.Types.ObjectId.isValid(id);
    if (!isValidId)
      return res.status(403).send(utils.responseMsg('Invalid Request Id!'));
    const createPostSchema = Joi.object().keys({
      post_message: Joi.string().required(),
    });
    const createPostSchemaOpt = { abortEarly: false };
    const validationResult = utils.validateData(
      createPostSchema,
      req.body,
      createPostSchemaOpt
    );
    if (validationResult) {
      return res.status(403).json(utils.responseMsg(validationResult));
    }
    // Create post

    // const post = await Post.create({user_id: id, ...req.body, })
    res.json({ message: 'Post created successfully' });
  } catch (error) {
    console.log(error);
    return res.status(500).json(utils.responseMsg(error.message));
  }
};

exports.updatePost = async (req, res) => {
  res.json({ message: 'Post updated successfully' });
};

exports.deletePost = async (req, res) => {
  res.json({ message: 'Post deleted successfully' });
};

exports.getAllPosts = async (req, res) => {
  res.json({ message: 'Posts fetched successfully' });
};
