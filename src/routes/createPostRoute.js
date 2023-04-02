const router = require('express').Router();
const { createPost } = require('../controllers/postController');
const passport = require('passport');

/**
 * @swagger
 * /{user_id}/post:
 *  post:
 *    summary: Create a new post
 *    tags: [Posts]
 *    parameters:
 *      - in: path
 *        name: user_id
 *        schema:
 *          type: string
 *        required: true
 *        description: The user id
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
 *      500:
 *        description: Server Error
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/ResultFail'
 */

router.post(
  '/:user_id/post',
  passport.authenticate('jwt', { session: false }),
  createPost
);

module.exports = router;
