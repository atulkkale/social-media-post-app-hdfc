const router = require('express').Router();
const { login } = require('../controllers/authController');

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - email
 *         - password
 *       properties:
 *         email:
 *           type: string
 *           description: The email of the user
 *         password:
 *           type: string
 *           description: The password of the user
 *       example:
 *         email: kaleatul9@gmail.com
 *         password: test
 */

/**
 * @swagger
 * components:
 *  schemas:
 *    ResultSuccess:
 *      type: object
 *      required:
 *        - success
 *        - error
 *        - data
 *      properties:
 *        success:
 *          type: boolean
 *          description: The status of the request
 *        error:
 *          type: string
 *          nullable: true
 *          description: The error message of the request
 *        data:
 *          type: string
 *          nullable: true
 *          description: The response data of the request
 *      example:
 *        success: true
 *        error: null
 *        data: Operation Successful
 */

/**
 * @swagger
 * components:
 *  schemas:
 *    ResultFail:
 *      type: object
 *      required:
 *        - success
 *        - error
 *        - data
 *      properties:
 *        success:
 *          type: boolean
 *          description: The status of the request
 *        error:
 *          type: string
 *          nullable: true
 *          description: The error message of the request
 *        data:
 *          type: string
 *          nullable: true
 *          description: The response data of the request
 *      example:
 *        success: false
 *        error: Error message
 *        data: null
 */

/**
 * @swagger
 * tags:
 *  name: Authentication
 *  description: The authentication API
 */

/**
 * @swagger
 * /auth/login:
 *  post:
 *    summary: Login the user and return the JWT token
 *    tags: [Authentication]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/User'
 *    responses:
 *      200:
 *        description: Login successful with a signed JWT token
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/ResultSuccess'
 *      401:
 *        description: Password not matched!
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
 *        description: User not found!
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

router.post('/login', login);

module.exports = router;
