import express from 'express';
import {
    getAll,
    search,
    getById,
    createBed,
    updateBed,
    deleteBed
} from '../controllers/Bed.controller.js';

const router = express.Router();
/**
 * @swagger
 * components:
 *   schemas:
 *     Bed:
 *       type: object
 *       required:
 *         - name
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the bed
 *         name:
 *           type: string
 *           description: The bed name
 *         description:
 *           type: string
 *           description: The bed code
 *         status: 
 *           type: string
 *           description: The bed status,
 */

/**
 * @swagger
 * tags:
 *   name: Beds
 *   description: The beds managing API
 */

/**
 * @swagger
 * /api/bed/create:
 *   post:
 *     summary: Create a new bed
 *     tags: [Beds]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Bed'
 *     responses:
 *       200:
 *         description: The bed was successfully created
 *         content:
 *           application/json:
 *             schema:
 *              type: object
 *              items: {}
 *       500:
 *         description: Some server error
 */
router.post('/create', createBed);

/**
 * @swagger
 * /api/bed/update:
 *  put:
 *    summary: Update the bed by the id
 *    tags: [Beds]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Bed'
 *    responses:
 *      200:
 *        description: The Bed was updated
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              items: {}
 *      404:
 *        description: The bed was not found
 *      500:
 *        description: Some error happened
 */
router.put('/update', updateBed);

/**
 * @swagger
 * /api/bed/getAll:
 *   get:
 *     summary: Returns the list of all the beds
 *     tags: [Beds]
 *     responses:
 *       200:
 *         description: The list of the beds
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Bed'
 */
 router.get('/getAll', getAll);

/**
 * @swagger
 * /api/bed/search:
 *   get:
 *     summary: Returns the list of all the bed
 *     tags: [Beds]
 *     parameters:
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *         required: false
 *         description: The Bed name.
 *       - in: query
 *         name: description
 *         schema:
 *           type: String
 *         required: false
 *         description: The Bed description.
 *       - in: query
 *         name: status
 *         schema:
 *           type: String
 *         required: false
 *         description: The Bed status
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
 *         description: The list of the bed
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Bed'
 */
router.get('/search', search);

/**
 * @swagger
 * /api/bed/{id}:
 *   get:
 *     summary: Get the bed by id
 *     tags: [Beds]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The bed id
 *     responses:
 *       200:
 *         description: The bed description by id
 *         contens:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Bed'
 *       404:
 *         description: The bed was not found
 */
router.get('/:id', getById);

/**
 * @swagger
 * /api/bed/delete/{id}:
 *   delete:
 *     summary: Remove the bed by id
 *     tags: [Beds]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The bed id
 * 
 *     responses:
 *       200:
 *         description: The bed was deleted
 *       404:
 *         description: The bed was not found
 */
router.delete('/delete/:id', deleteBed);

export default router;