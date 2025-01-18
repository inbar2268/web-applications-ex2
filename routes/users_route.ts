import express from "express";
const router = express.Router();
import usersController from "../controllers/users_controller";

/**
* @swagger
* tags:
*   name: Users
*   description: The Users API
*/

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - username
 *         - email
 *       properties:
 *         _id:
 *           type: string
 *           description: The auto-generated id of the post
 *         username:
 *           type: string
 *           description: The username of the user
 *         email:
 *           type: string
 *           description: The email of the user
 *         posts:
 *           type: [string]
 *           description: List of posts`s ids
 *       example:
 *         _id: 245234t234234r234r23f4
 *         username: user123
 *         email: user234@gmail.com
 *         posts: ["4134134mkdfn332","djwne834bj4f43v368","7d8s8dg8bc3uib382b8"]
 */


/**
 * @swagger
 * /users:
 *   post:
 *     summary: Create a new user
 *     description: Create a new user
 *     tags:
 *       - Users
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 description: The username of the user
 *               email:
 *                 type: string
 *                 description: The email of the user
 *             required:
 *               - username
 *               - email
 *     responses:
 *       201:
 *         description: User created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: Invalid input
 *       500:
 *         description: Server error
 */

router.post("/", usersController.addNewUser);

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Get a user by ID
 *     description: Get a user by its ID
 *     tags:
 *       - Users
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the user
 *     responses:
 *       200:
 *         description: A User
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: User not found
 *       500:
 *         description: Server error
 */

router.get("/:id", usersController.getUserByID);

/**
 * @swagger
 * /users/{id}:
 *   put:
 *     summary: Update a user
 *     description: Update a user by ID
 *     tags:
 *       - Users
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the user
  *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 description: The username of the user
 *               email:
 *                 type: string
 *                 description: The email of the user
 *             required:
 *               - username
 *               - email
 *     responses:
 *       201:
 *         description: User updated successfully
 *       404:
 *         description: User not found
 *       500:
 *         description: Server error
 */

router.put("/:id", usersController.updateUser);

/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     summary: Delete a user by ID
 *     description: Delete a user by its ID
 *     tags:
 *       - Users
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the user
 *     responses:
 *       200:
 *         description: User deleted successfully
 *       404:
 *         description: User not found
 *       500:
 *         description: Server error
 */

router.delete("/:id", usersController.deleteUser);

export default router;