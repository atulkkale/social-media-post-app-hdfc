const router = require('express').Router();
const {
  updatePost,
  deletePost,
  getAllPosts,
} = require('../controllers/postController');
const passport = require('passport');

/**
 * @swagger
 * components:
 *   schemas:
 *     postMessage:
 *       type: object
 *       required:
 *         - post_message
 *       properties:
 *         post_message:
 *           type: string
 *           description: The post message of the user
 *       example:
 *         post_message: Hi, this is my 1st post message
 */

/**
 * @swagger
 * tags:
 *  name: Posts
 *  description: The posts managing API
 */

/**
 * @swagger
 * /post/{post_id}:
 *  put:
 *    summary: Update the post message
 *    tags: [Posts]
 *    parameters:
 *      - in: path
 *        name: post_id
 *        schema:
 *          type: string
 *        required: true
 *        description: The post id
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/postMessage'
 *    security:
 *     - bearerAuth: []
 *    responses:
 *      200:
 *        description: A result object
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/ResultSuccess'
 *
 *      401:
 *        description: Unauthorized
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/ResultFail'
 *      403:
 *        description: Validation Error
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/ResultFail'
 *      404:
 *        description: Post not found!
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/ResultFail'
 *      500:
 *        description: Server Error
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/ResultFail'
 */

router.put(
  '/:post_id',
  passport.authenticate('jwt', { session: false }),
  updatePost
);

/**
 * @swagger
 * /post/{post_id}:
 *  delete:
 *    summary: Delete the post message
 *    tags: [Posts]
 *    parameters:
 *      - in: path
 *        name: post_id
 *        schema:
 *          type: string
 *        required: true
 *        description: The post id
 *    security:
 *     - bearerAuth: []
 *    responses:
 *      200:
 *        description: A result object
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/ResultSuccess'
 *      401:
 *        description: Unauthorized
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/ResultFail'
 *      403:
 *        description: Validation Error
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/ResultFail'
 *      404:
 *        description: Post not found!
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/ResultFail'
 *      500:
 *        description: Server Error
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/ResultFail'
 */

router.delete(
  '/:post_id',
  passport.authenticate('jwt', { session: false }),
  deletePost
);

/**
 * @swagger
 * /post/{user_id}:
 *  get:
 *    summary: Get all posts of the user
 *    tags: [Posts]
 *    parameters:
 *      - in: path
 *        name: user_id
 *        schema:
 *          type: string
 *        required: true
 *        description: The user id
 *    security:
 *     - bearerAuth: []
 *    responses:
 *      200:
 *        description: A result object
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/ResultSuccess'
 *      401:
 *        description: Unauthorized
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/ResultFail'
 *      403:
 *        description: Validation Error
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/ResultFail'
 *      500:
 *        description: Server Error
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/ResultFail'
 */

router.get(
  '/:user_id',
  passport.authenticate('jwt', { session: false }),
  getAllPosts
);

module.exports = router;
