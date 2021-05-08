import express from 'express';
import {
    createCity,
    updateCity,
    search,
    getById,
    deleteCity
} from '../controllers/city.controller.js';

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     City:
 *       type: object
 *       required:
 *         - name
 *         - country
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the city
 *         name:
 *           type: string
 *           description: The city name
 *         countryId:
 *           type: string
 *           description: The country code
 *         status: 
 *           type: string
 *           description: The city status
 */

/**
 * @swagger
 * tags:
 *   name: Cities
 *   description: The Cities managing API
 */

/**
 * @swagger
 * /api/city/create:
 *   post:
 *     summary: Create a new city
 *     tags: [Cities]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/City'
 *     responses:
 *       200:
 *         description: The country was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/City'
 *       500:
 *         description: Some server error
 */
router.post('/create', createCity);

/**
 * @swagger
 * /api/city/update:
 *  put:
 *    summary: Update the city by the id
 *    tags: [Cities]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/City'
 *    responses:
 *      200:
 *        description: The city was updated
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              items: {}
 *      404:
 *        description: The city was not found
 *      500:
 *        description: Some error happened
 */
router.put('/update', updateCity);
/**
 * @swagger
 * /api/city/search:
 *   get:
 *     summary: Returns the list of all the city
 *     tags: [Cities]
 *     parameters:
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *         required: false
 *         description: The city name.
 *       - in: query
 *         name: countryId
 *         schema:
 *           type: String
 *         required: false
 *         description: The country id.
 *       - in: query
 *         name: status
 *         schema:
 *           type: String
 *         required: false
 *         description: The status of city
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
 *         description: The list of the city
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/City'
 */
router.get('/search', search);

/**
 * @swagger
 * /api/city/{id}:
 *   get:
 *     summary: Get the city by id
 *     tags: [Cities]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The city id
 *     responses:
 *       200:
 *         description: The city description by id
 *         contens:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/City'
 *       404:
 *         description: The city was not found
 */
router.get('/:id', getById);

/**
 * @swagger
 * /api/city/delete/{id}:
 *   delete:
 *     summary: Remove the city by id
 *     tags: [Cities]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The city id
 * 
 *     responses:
 *       200:
 *         description: The city was deleted
 *       404:
 *         description: The city was not found
 */
router.delete('/delete/:id', deleteCity);

export default router;