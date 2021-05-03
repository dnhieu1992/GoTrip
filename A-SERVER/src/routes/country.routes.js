import express from 'express';
import {
    createCountry,
    updateCountry,
    search,
    getById,
    deleteCountry
} from '../controllers/country.controller.js';

const router = express.Router();
/**
 * @swagger
 * components:
 *   schemas:
 *     Country:
 *       type: object
 *       required:
 *         - name
 *         - code
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the country
 *         name:
 *           type: string
 *           description: The country name
 *         code:
 *           type: string
 *           description: The country code
 *         status: string
 *         description: The country status,
 *       example:
 *         id: d5fE_asz
 *         name: Viet Nam
 *         code: VN,
 *         status: Actived
 */

/**
 * @swagger
 * tags:
 *   name: Countries
 *   description: The Countries managing API
 */

/**
 * @swagger
 * /api/country/create:
 *   post:
 *     summary: Create a new country
 *     tags: [Countries]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Country'
 *     responses:
 *       200:
 *         description: The country was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Country'
 *       500:
 *         description: Some server error
 */
router.post('/create', createCountry);

/**
 * @swagger
 * /api/country/update:
 *  put:
 *    summary: Update the country by the id
 *    tags: [Countries]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Country'
 *    responses:
 *      200:
 *        description: The country was updated
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Country'
 *      404:
 *        description: The country was not found
 *      500:
 *        description: Some error happened
 */
router.put('/update', updateCountry);

/**
 * @swagger
 * /api/country/search:
 *   get:
 *     summary: Returns the list of all the country
 *     tags: [Countries]
 *     responses:
 *       200:
 *         description: The list of the books
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Countries'
 */
router.get('/search', search);

/**
 * @swagger
 * /api/country/{id}:
 *   get:
 *     summary: Get the country by id
 *     tags: [Countries]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The country id
 *     responses:
 *       200:
 *         description: The country description by id
 *         contens:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Country'
 *       404:
 *         description: The country was not found
 */
router.get('/:id', getById);

/**
 * @swagger
 * /api/country/delete/{id}:
 *   delete:
 *     summary: Remove the country by id
 *     tags: [Countries]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The country id
 * 
 *     responses:
 *       200:
 *         description: The country was deleted
 *       404:
 *         description: The country was not found
 */
router.delete('/delete/:id', deleteCountry);

export default router;