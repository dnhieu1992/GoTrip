import express from 'express';
import {
    search,
    getById,
    createPropertyType,
    updatePropertyType,
    deletePropertyType
} from '../controllers/propertyType.controller.js';

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     PropertyType:
 *       type: object
 *       required:
 *         - name
 *         - propertyId
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the PropertyType
 *         name:
 *           type: string
 *           description: The PropertyType name
 *         description:
 *           type: string
 *           description: The PropertyType description
 *         propertyId:
 *           type: string
 *           description: The PropertyType code
 *         status: 
 *           type: string
 *           description: The PropertyType status
 */

/**
 * @swagger
 * tags:
 *   name: PropertyTypes
 *   description: The Property Types managing API
 */

/**
 * @swagger
 * /api/propertyType/create:
 *   post:
 *     summary: Create a new Property Type
 *     tags: [PropertyTypes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PropertyType'
 *     responses:
 *       200:
 *         description: The Property Type was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PropertyType'
 *       500:
 *         description: Some server error
 */
router.post('/create', createPropertyType);

/**
 * @swagger
 * /api/propertyType/update:
 *  put:
 *    summary: Update the Property Type by the id
 *    tags: [PropertyTypes]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/PropertyType'
 *    responses:
 *      200:
 *        description: The Property Type was updated
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              items: {}
 *      404:
 *        description: The Property Type was not found
 *      500:
 *        description: Some error happened
 */
router.put('/update', updatePropertyType);
/**
 * @swagger
 * /api/propertyType/search:
 *   get:
 *     summary: Returns the list of all the Property Types
 *     tags: [PropertyTypes]
 *     parameters:
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *         required: false
 *         description: The Property Type name.
 *       - in: query
 *         name: propertyId
 *         schema:
 *           type: String
 *         required: false
 *         description: The Property Type id.
 *       - in: query
 *         name: status
 *         schema:
 *           type: String
 *         required: false
 *         description: The status of Property Type
 *     responses:
 *       200:
 *         description: The list of the Property Types
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/PropertyType'
 */
router.get('/search', search);

/**
 * @swagger
 * /api/propertyType/{id}:
 *   get:
 *     summary: Get the Property Type by id
 *     tags: [PropertyTypes]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The Property Type id
 *     responses:
 *       200:
 *         description: The Property Type description by id
 *         contens:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PropertyType'
 *       404:
 *         description: The Property Type was not found
 */
router.get('/:id', getById);

/**
 * @swagger
 * /api/propertyType/delete/{id}:
 *   delete:
 *     summary: Remove the Property Type by id
 *     tags: [PropertyTypes]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The Property Type id
 * 
 *     responses:
 *       200:
 *         description: The Property Type was deleted
 *       404:
 *         description: The Property Type was not found
 */
router.delete('/delete/:id', deletePropertyType);

export default router;