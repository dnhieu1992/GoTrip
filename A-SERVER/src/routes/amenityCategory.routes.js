import express from 'express';
import {
    getAll,
    search,
    getById,
    createAmenityCategory,
    updateAmenityCategory,
    deleteAmenityCategory
} from '../controllers/master-datas/amenityCategory.controller.js';

const router = express.Router();
/**
 * @swagger
 * components:
 *   schemas:
 *     AmenityCategory:
 *       type: object
 *       required:
 *         - name
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the Amenity Category
 *         name:
 *           type: string
 *           description: The Amenity Category name
 *         description:
 *           type: string
 *           description: The Amenity Category description
 *         status: 
 *           type: string
 *           description: The Amenity Category status,
 */

/**
 * @swagger
 * tags:
 *   name: AmenityCategories
 *   description: The AmenityCategories managing API
 */

/**
 * @swagger
 * /api/amenityCategory/create:
 *   post:
 *     summary: Create a new Amenity Category
 *     tags: [AmenityCategories]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AmenityCategory'
 *     responses:
 *       200:
 *         description: The Amenity Category was successfully created
 *         content:
 *           application/json:
 *             schema:
 *              type: object
 *              items: {}
 *       500:
 *         description: Some server error
 */
router.post('/create', createAmenityCategory);

/**
 * @swagger
 * /api/amenityCategory/update:
 *  put:
 *    summary: Update the Amenity Category by the id
 *    tags: [AmenityCategories]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/AmenityCategory'
 *    responses:
 *      200:
 *        description: The Amenity Category was updated
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              items: {}
 *      404:
 *        description: The Amenity Category was not found
 *      500:
 *        description: Some error happened
 */
router.put('/update', updateAmenityCategory);

/**
 * @swagger
 * /api/amenityCategory/getAll:
 *   get:
 *     summary: Returns the list of all the Amenity Categories
 *     tags: [AmenityCategories]
 *     responses:
 *       200:
 *         description: The list of the Amenity Categories
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/AmenityCategory'
 */
 router.get('/getAll', getAll);

/**
 * @swagger
 * /api/amenityCategory/search:
 *   get:
 *     summary: Returns the list of all the Amenity Category
 *     tags: [AmenityCategories]
 *     parameters:
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *         required: false
 *         description: The Amenity Category name.
 *       - in: query
 *         name: description
 *         schema:
 *           type: String
 *         required: false
 *         description: The Amenity Category description.
 *       - in: query
 *         name: status
 *         schema:
 *           type: String
 *         required: false
 *         description: The Amenity Category status
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
 *         description: The list of the Amenity Category
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/AmenityCategory'
 */
router.get('/search', search);

/**
 * @swagger
 * /api/amenityCategory/{id}:
 *   get:
 *     summary: Get the Amenity Category by id
 *     tags: [AmenityCategories]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The Amenity Category id
 *     responses:
 *       200:
 *         description: The Amenity Category description by id
 *         contens:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AmenityCategory'
 *       404:
 *         description: The Amenity Category was not found
 */
router.get('/:id', getById);

/**
 * @swagger
 * /api/amenityCategory/delete/{id}:
 *   delete:
 *     summary: Remove the Amenity Category by id
 *     tags: [AmenityCategories]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The Amenity Category id
 * 
 *     responses:
 *       200:
 *         description: The Amenity Category was deleted
 *       404:
 *         description: The Amenity Category was not found
 */
router.delete('/delete/:id', deleteAmenityCategory);

export default router;