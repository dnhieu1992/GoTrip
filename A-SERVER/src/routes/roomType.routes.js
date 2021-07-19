import express from 'express';
import {
    getAll,
    search,
    getById,
    createRoomType,
    updateRoomType,
    deleteRoomType
} from '../controllers/master-datas/roomType.controller.js';

const router = express.Router();
/**
 * @swagger
 * components:
 *   schemas:
 *     RoomType:
 *       type: object
 *       required:
 *         - name
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the room type
 *         name:
 *           type: string
 *           description: The room type name
 *         description:
 *           type: string
 *           description: The room type code
 *         status: 
 *           type: string
 *           description: The room type status,
 */

/**
 * @swagger
 * tags:
 *   name: RoomTypes
 *   description: The Room Types managing API
 */

/**
 * @swagger
 * /api/roomType/create:
 *   post:
 *     summary: Create a new room type
 *     tags: [RoomTypes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RoomType'
 *     responses:
 *       200:
 *         description: The room type was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RoomType'
 *       500:
 *         description: Some server error
 */
router.post('/create', createRoomType);

/**
 * @swagger
 * /api/roomType/update:
 *  put:
 *    summary: Update the room type by the id
 *    tags: [RoomTypes]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/RoomType'
 *    responses:
 *      200:
 *        description: The room type was updated
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              items: {}
 *      404:
 *        description: The room type was not found
 *      500:
 *        description: Some error happened
 */
router.put('/update', updateRoomType);

/**
 * @swagger
 * /api/roomType/getAll:
 *   get:
 *     summary: Returns the list of all the Room types
 *     tags: [RoomTypes]
 *     responses:
 *       200:
 *         description: The list of the room types
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/RoomType'
 */
 router.get('/getAll', getAll);

/**
 * @swagger
 * /api/roomType/search:
 *   get:
 *     summary: Returns the list of all the room type
 *     tags: [RoomTypes]
 *     parameters:
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *         required: false
 *         description: The room type name.
 *       - in: query
 *         name: description
 *         schema:
 *           type: String
 *         required: false
 *         description: The room type description.
 *       - in: query
 *         name: status
 *         schema:
 *           type: String
 *         required: false
 *         description: The room type status
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
 *         description: The list of the room type
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/RoomType'
 */
router.get('/search', search);

/**
 * @swagger
 * /api/roomType/{id}:
 *   get:
 *     summary: Get the room type by id
 *     tags: [RoomTypes]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The room type id
 *     responses:
 *       200:
 *         description: The room type description by id
 *         contens:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RoomType'
 *       404:
 *         description: The room type was not found
 */
router.get('/:id', getById);

/**
 * @swagger
 * /api/roomType/delete/{id}:
 *   delete:
 *     summary: Remove the room type by id
 *     tags: [RoomTypes]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The room type id
 * 
 *     responses:
 *       200:
 *         description: The room type was deleted
 *       404:
 *         description: The room type was not found
 */
router.delete('/delete/:id', deleteRoomType);

export default router;