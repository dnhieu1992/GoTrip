import express from 'express';
import {
    createRoomName,
    updateRoomName,
    search,
    getById,
    deleteRoomName
} from '../controllers/RoomName.controller.js';

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     RoomName:
 *       type: object
 *       required:
 *         - name
 *         - roomType
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the room name
 *         name:
 *           type: string
 *           description: The name of room
 *         roomTypeId:
 *           type: string
 *           description: The room type code
 *         status: 
 *           type: string
 *           description: The room name status
 */

/**
 * @swagger
 * tags:
 *   name: RoomNames
 *   description: The room names managing API
 */

/**
 * @swagger
 * /api/roomName/create:
 *   post:
 *     summary: Create a new Room Name
 *     tags: [RoomNames]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RoomName'
 *     responses:
 *       200:
 *         description: The room name was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RoomName'
 *       500:
 *         description: Some server error
 */
router.post('/create', createRoomName);

/**
 * @swagger
 * /api/roomName/update:
 *  put:
 *    summary: Update the Room Name by the id
 *    tags: [RoomNames]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/RoomName'
 *    responses:
 *      200:
 *        description: The Room Name was updated
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              items: {}
 *      404:
 *        description: The Room Name was not found
 *      500:
 *        description: Some error happened
 */
router.put('/update', updateRoomName);
/**
 * @swagger
 * /api/roomName/search:
 *   get:
 *     summary: Returns the list of all the Room Names  
 *     tags: [RoomNames]
 *     parameters:
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *         required: false
 *         description: The RoomName name.
 *       - in: query
 *         name: roomTypeId
 *         schema:
 *           type: String
 *         required: false
 *         description: The room typeid.
 *       - in: query
 *         name: status
 *         schema:
 *           type: String
 *         required: false
 *         description: The status of RoomName
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
 *         description: The list of the RoomName
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/RoomName'
 */
router.get('/search', search);

/**
 * @swagger
 * /api/roomName/{id}:
 *   get:
 *     summary: Get the RoomName by id
 *     tags: [RoomNames]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The RoomName id
 *     responses:
 *       200:
 *         description: The RoomName description by id
 *         contens:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RoomName'
 *       404:
 *         description: The RoomName was not found
 */
router.get('/:id', getById);

/**
 * @swagger
 * /api/roomName/delete/{id}:
 *   delete:
 *     summary: Remove the RoomName by id
 *     tags: [RoomNames]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The RoomName id
 * 
 *     responses:
 *       200:
 *         description: The RoomName was deleted
 *       404:
 *         description: The RoomName was not found
 */
router.delete('/delete/:id', deleteRoomName);

export default router;