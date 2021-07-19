import express from 'express';
import {
    createAmenity,
    updateAmenity,
    search,
    getById,
    deleteAmenity
} from '../controllers/master-datas/amenity.controller.js';

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Amenity:
 *       type: object
 *       required:
 *         - name
 *         - amenity
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the Amenity
 *         name:
 *           type: string
 *           description: The Amenity name
 *         description:
 *           type: string
 *           description: The Amenity description
 *         amenityCategoryId:
 *           type: string
 *           description: The amenity code
 *         status: 
 *           type: string
 *           description: The Amenity status
 */

/**
 * @swagger
 * tags:
 *   name: Amenities
 *   description: The Amenities managing API
 */

/**
 * @swagger
 * /api/amenity/create:
 *   post:
 *     summary: Create a new Amenity
 *     tags: [Amenities]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Amenity'
 *     responses:
 *       200:
 *         description: The amenity was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Amenity'
 *       500:
 *         description: Some server error
 */
router.post('/create', createAmenity);

/**
 * @swagger
 * /api/amenity/update:
 *  put:
 *    summary: Update the Amenity by the id
 *    tags: [Amenities]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Amenity'
 *    responses:
 *      200:
 *        description: The Amenity was updated
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              items: {}
 *      404:
 *        description: The Amenity was not found
 *      500:
 *        description: Some error happened
 */
router.put('/update', updateAmenity);
/**
 * @swagger
 * /api/amenity/search:
 *   get:
 *     summary: Returns the list of all the Amenity
 *     tags: [Amenities]
 *     parameters:
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *         required: false
 *         description: The Amenity name.
 *       - in: query
 *         name: amenityCategoryId
 *         schema:
 *           type: String
 *         required: false
 *         description: The amenity id.
 *       - in: query
 *         name: status
 *         schema:
 *           type: String
 *         required: false
 *         description: The status of Amenity
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
 *         description: The list of the Amenity
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Amenity'
 */
router.get('/search', search);

/**
 * @swagger
 * /api/amenity/{id}:
 *   get:
 *     summary: Get the Amenity by id
 *     tags: [Amenities]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The Amenity id
 *     responses:
 *       200:
 *         description: The Amenity description by id
 *         contens:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Amenity'
 *       404:
 *         description: The Amenity was not found
 */
router.get('/:id', getById);

/**
 * @swagger
 * /api/amenity/delete/{id}:
 *   delete:
 *     summary: Remove the Amenity by id
 *     tags: [Amenities]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The Amenity id
 * 
 *     responses:
 *       200:
 *         description: The Amenity was deleted
 *       404:
 *         description: The Amenity was not found
 */
router.delete('/delete/:id', deleteAmenity);

export default router;