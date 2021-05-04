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
router.put('/update', updateCity);
/**
 * @swagger
 * /api/city/search:
 *   get:
 *     summary: Returns the list of all the city
 *     tags: [Cities]
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
router.get('/getById', getById);
router.delete('/delete', deleteCity);

export default router;