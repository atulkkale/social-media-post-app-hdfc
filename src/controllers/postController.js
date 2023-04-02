const utils = require('../helpers/utils');
const mongoose = require('mongoose');
const Joi = require('joi');
const Post = require('../models/post');

const postMessageSchema = Joi.object().keys({
  post_message: Joi.string().required(),
});
const postMessageSchemaOpt = { abortEarly: false };

exports.createPost = async (req, res) => {
  try {
    // Validation
    const { user_id } = req.params;
    const { id } = req.user;
    const isValidId = mongoose.Types.ObjectId.isValid(user_id);
    if (!isValidId)
      return res.status(403).json(utils.responseMsg('Invalid Request Id!'));
    const validationResult = utils.validateData(
      postMessageSchema,
      req.body,
      postMessageSchemaOpt
    );
    if (validationResult)
      return res.status(403).json(utils.responseMsg(validationResult));

    if (user_id !== id)
      return res.status(403).json(utils.responseMsg('Make post for yourself!'));
    // Collect previous messages if any
    const previousMessages = await Post.find({ user_id: id }, { _id: 1 }).sort({
      createdAt: -1,
    });
    // Create post
    await Post.create({
      user_id,
      ...req.body,
      previous_message: previousMessages,
      is_active: 0,
    });
    return res
      .status(200)
      .json(
        utils.responseMsg(null, true, { message: 'Post created successfully' })
      );
  } catch (error) {
    console.log(error);
    return res.status(500).json(utils.responseMsg(error.message));
  }
};

exports.updatePost = async (req, res) => {
  try {
    // Validation
    const { post_id } = req.params;
    const isValidId = mongoose.Types.ObjectId.isValid(post_id);
    if (!isValidId)
      return res.status(403).json(utils.responseMsg('Invalid Request Id!'));
    const validationResult = utils.validateData(
      postMessageSchema,
      req.body,
      postMessageSchemaOpt
    );
    if (validationResult) {
      return res.status(403).json(utils.responseMsg(validationResult));
    }
    // Update post
    const post = await Post.findOne({
      _id: post_id,
      user_id: req.user._id,
    });
    if (!post)
      return res.status(404).json(utils.responseMsg('Post not found!'));
    post.post_message = req.body.post_message;
    await post.save();
    return res
      .status(200)
      .json(utils.responseMsg(null, true, 'Post updated successfully'));
  } catch (error) {
    console.log(error);
    return res.status(500).json(utils.responseMsg(error.message));
  }
};

exports.deletePost = async (req, res) => {
  try {
    // Validation
    const { post_id } = req.params;
    const isValidId = mongoose.Types.ObjectId.isValid(post_id);
    if (!isValidId)
      return res.status(403).json(utils.responseMsg('Invalid Request Id!'));
    // Delete post
    const deletedPost = await Post.findOneAndDelete({
      _id: post_id,
      user_id: req.user._id,
    });
    if (!deletedPost)
      return res.status(404).json(utils.responseMsg('Post not found!'));
    // Delete all previous messages
    await Post.updateMany(
      {
        user_id: req.user._id,
      },
      {
        $pull: {
          previous_message: {
            $in: deletedPost._id,
          },
        },
      }
    );
    return res.status(200).json(utils.responseMsg(null, true, 'Post deleted'));
  } catch (error) {
    console.log(error);
    return res.status(500).json(utils.responseMsg(error.message));
  }
};

exports.getAllPosts = async (req, res) => {
  res.json({ message: 'Posts fetched successfully' });
};
