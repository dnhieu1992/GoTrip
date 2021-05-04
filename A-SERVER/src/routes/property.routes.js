import express from 'express';
import {
    createProperty,
    search,
    getById,
    updateProperty,
    deleteProperty
} from '../controllers/property.controller.js';

const router = express.Router();
/**
 * @swagger
 * components:
 *   schemas:
 *     Property:
 *       type: object
 *       required:
 *         - name
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the property
 *         name:
 *           type: string
 *           description: The property name
 *         description:
 *           type: string
 *           description: The property code
 *         status: 
 *           type: string
 *           description: The property status,
 */

/**
 * @swagger
 * tags:
 *   name: Properties
 *   description: The Properties managing API
 */

/**
 * @swagger
 * /api/property/create:
 *   post:
 *     summary: Create a new property
 *     tags: [Properties]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Property'
 *     responses:
 *       200:
 *         description: The property was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Property'
 *       500:
 *         description: Some server error
 */
router.post('/create', createProperty);

/**
 * @swagger
 * /api/property/update:
 *  put:
 *    summary: Update the property by the id
 *    tags: [Properties]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Property'
 *    responses:
 *      200:
 *        description: The property was updated
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              items: {}
 *      404:
 *        description: The property was not found
 *      500:
 *        description: Some error happened
 */
router.put('/update', updateProperty);

/**
 * @swagger
 * /api/property/search:
 *   get:
 *     summary: Returns the list of all the property
 *     tags: [Properties]
 *     parameters:
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *         required: false
 *         description: The property name.
 *       - in: query
 *         name: description
 *         schema:
 *           type: String
 *         required: false
 *         description: The property description.
 *       - in: query
 *         name: status
 *         schema:
 *           type: String
 *         required: false
 *         description: The property status
 *     responses:
 *       200:
 *         description: The list of the property
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Property'
 */
router.get('/search', search);

/**
 * @swagger
 * /api/property/{id}:
 *   get:
 *     summary: Get the property by id
 *     tags: [Properties]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The property id
 *     responses:
 *       200:
 *         description: The property description by id
 *         contens:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Property'
 *       404:
 *         description: The property was not found
 */
router.get('/:id', getById);

/**
 * @swagger
 * /api/property/delete/{id}:
 *   delete:
 *     summary: Remove the property by id
 *     tags: [Properties]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The property id
 * 
 *     responses:
 *       200:
 *         description: The property was deleted
 *       404:
 *         description: The property was not found
 */
router.delete('/delete/:id', deleteProperty);

export default router;