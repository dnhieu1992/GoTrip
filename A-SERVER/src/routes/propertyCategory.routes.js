import express from 'express';
import {
    getAll,
    search,
    getById,
    create,
    update,
    remove
} from '../controllers/master-datas/propertyCategory.controller.js';

const router = express.Router();
/**
 * @swagger
 * components:
 *   schemas:
 *     PropertyCategory:
 *       type: object
 *       required:
 *         - name
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the property category
 *         name:
 *           type: string
 *           description: The property category name
 *         description:
 *           type: string
 *           description: The property category code
 *         status: 
 *           type: string
 *           description: The property category status,
 */

/**
 * @swagger
 * tags:
 *   name: PropertyCategories
 *   description: The Property Categories managing API
 */

/**
 * @swagger
 * /api/propertyCategory/create:
 *   post:
 *     summary: Create a new property category
 *     tags: [PropertyCategories]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PropertyCategory'
 *     responses:
 *       200:
 *         description: The property categorywas successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PropertyCategory'
 *       500:
 *         description: Some server error
 */
router.post('/create', create);

/**
 * @swagger
 * /api/propertyCategory/update:
 *  put:
 *    summary: Update the property categoryby the id
 *    tags: [PropertyCategories]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/PropertyCategory'
 *    responses:
 *      200:
 *        description: The property category was updated
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              items: {}
 *      404:
 *        description: The property category was not found
 *      500:
 *        description: Some error happened
 */
router.put('/update', update);

/**
 * @swagger
 * /api/propertyCategory/getAll:
 *   get:
 *     summary: Returns the list of all the Properties
 *     tags: [PropertyCategories]
 *     responses:
 *       200:
 *         description: The list of the property categories
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/PropertyCategory'
 */
 router.get('/getAll', getAll);

/**
 * @swagger
 * /api/propertyCategory/search:
 *   get:
 *     summary: Returns the list of all the property category
 *     tags: [PropertyCategories]
 *     parameters:
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *         required: false
 *         description: The property category name.
 *       - in: query
 *         name: description
 *         schema:
 *           type: String
 *         required: false
 *         description: The property category description.
 *       - in: query
 *         name: status
 *         schema:
 *           type: String
 *         required: false
 *         description: The property category status
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
 *     summary: Get the property category by id
 *     tags: [PropertyCategories]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The property category id
 *     responses:
 *       200:
 *         description: The property category description by id
 *         contens:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PropertyCategory'
 *       404:
 *         description: The property category was not found
 */
router.get('/:id', getById);

/**
 * @swagger
 * /api/property/delete/{id}:
 *   delete:
 *     summary: Remove the property category by id
 *     tags: [PropertyCategories]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The property category id
 * 
 *     responses:
 *       200:
 *         description: The property category was deleted
 *       404:
 *         description: The property category was not found
 */
router.delete('/delete/:id', remove);

export default router;