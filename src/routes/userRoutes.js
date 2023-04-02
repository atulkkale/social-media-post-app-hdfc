const router = require('express').Router();
const { createUser, getUserInfo } = require('../controllers/userController');

/**
 * @swagger
 * components:
 *   schemas:
 *     createUser:
 *       type: object
 *       required:
 *         - name
 *         - email
 *         - password
 *         - role_id
 *       properties:
 *         name:
 *           type: string
 *           description: The name of the user
 *         email:
 *           type: string
 *           description: The email of the user
 *         password:
 *           type: string
 *           description: The password of the user
 *         role_id:
 *           type: integer
 *           description: The role id of the user
 *       example:
 *         name: atul kale
 *         email: kaleatul9@gmail.com
 *         password: test
 *         role_id: 1
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
 *  name: Users
 *  description: The users managing API
 */

/**
 * @swagger
 * /user/:
 *  post:
 *    summary: Create a new user
 *    tags: [Users]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/createUser'
 *    responses:
 *      200:
 *        description: A result object
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/ResultSuccess'
 *      403:
 *        description: Validation Error
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/ResultFail'
 *      409:
 *        description: User already exists!
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

router.post('/', createUser);

/**
 * @swagger
 * /user/{user_id}:
 *  get:
 *    summary: Get the user info
 *    tags: [Users]
 *    parameters:
 *      - in: path
 *        name: user_id
 *        schema:
 *          type: string
 *        required: true
 *        description: The user id
 *    responses:
 *      200:
 *        description: User info fetched successfully
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/ResultSuccess'
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

router.get('/:user_id', getUserInfo);

module.exports = router;
