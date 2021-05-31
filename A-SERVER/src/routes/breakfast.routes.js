import express from 'express';
import {
    getAll,
    search,
    getById,
    createBreakfast,
    updateBreakfast,
    deleteBreakfast
} from '../controllers/breakfast.controller.js';

const router = express.Router();
/**
 * @swagger
 * components:
 *   schemas:
 *     Breakfast:
 *       type: object
 *       required:
 *         - name
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the breakfast
 *         name:
 *           type: string
 *           description: The breakfast name
 *         description:
 *           type: string
 *           description: The breakfast code
 *         status: 
 *           type: string
 *           description: The breakfast status,
 */

/**
 * @swagger
 * tags:
 *   name: Breakfasts
 *   description: The breakfast managing API
 */

/**
 * @swagger
 * /api/breakfast/create:
 *   post:
 *     summary: Create a new Breakfast
 *     tags: [Breakfasts]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Breakfast'
 *     responses:
 *       200:
 *         description: The Breakfast was successfully created
 *         content:
 *           application/json:
 *             schema:
 *              type: object
 *              items: {}
 *       500:
 *         description: Some server error
 */
router.post('/create', createBreakfast);

/**
 * @swagger
 * /api/breakfast/update:
 *  put:
 *    summary: Update the Breakfast by the id
 *    tags: [Breakfasts]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Breakfast'
 *    responses:
 *      200:
 *        description: The Breakfast was updated
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              items: {}
 *      404:
 *        description: The Breakfast was not found
 *      500:
 *        description: Some error happened
 */
router.put('/update', updateBreakfast);

/**
 * @swagger
 * /api/breakfast/getAll:
 *   get:
 *     summary: Returns the list of all the Breakfasts
 *     tags: [Breakfasts]
 *     responses:
 *       200:
 *         description: The list of the Breakfasts
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Breakfast'
 */
 router.get('/getAll', getAll);

/**
 * @swagger
 * /api/breakfast/search:
 *   get:
 *     summary: Returns the list of all the Breakfast
 *     tags: [Breakfasts]
 *     parameters:
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *         required: false
 *         description: The Breakfast name.
 *       - in: query
 *         name: description
 *         schema:
 *           type: String
 *         required: false
 *         description: The Breakfast description.
 *       - in: query
 *         name: status
 *         schema:
 *           type: String
 *         required: false
 *         description: The Breakfast status
 *       - in: query
 *         name: pageNumber
 *         schema:
 *           type: Number
 *         required: false
 *         default: 1
 *         description: The Page Number
 *       - in: query
 *         name: pageSize
 *         schema:
 *           type: Number
 *         required: false
 *         default: 50
 *         description: The Page Size
 *       - in: query
 *         name: sortDirection
 *         schema:
 *           type: String
 *         required: false
 *         default: asc
 *         description: The Sort Direction(asc/desc)
 *       - in: query
 *         name: sortField
 *         schema:
 *           type: String
 *         required: false
 *         default: name
 *         description: The Sort Field
 *     responses:
 *       200:
 *         description: The list of the Breakfast
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Breakfast'
 */
router.get('/search', search);

/**
 * @swagger
 * /api/breakfast/{id}:
 *   get:
 *     summary: Get the Breakfast by id
 *     tags: [Breakfasts]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The Breakfast id
 *     responses:
 *       200:
 *         description: The Breakfast description by id
 *         contens:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Breakfast'
 *       404:
 *         description: The Breakfast was not found
 */
router.get('/:id', getById);

/**
 * @swagger
 * /api/breakfast/delete/{id}:
 *   delete:
 *     summary: Remove the Breakfast by id
 *     tags: [Breakfasts]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The Breakfast id
 * 
 *     responses:
 *       200:
 *         description: The Breakfast was deleted
 *       404:
 *         description: The Breakfast was not found
 */
router.delete('/delete/:id', deleteBreakfast);

export default router;