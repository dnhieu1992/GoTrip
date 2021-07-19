import express from 'express';
import {
    createProperty
} from '../controllers/propertyManagement.controller.js';
import { propertyValidationRules, validate } from '../validations/validationRules.js';

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Property:
 *       type: object
 *       required:
 *         - propertyTypeId
 *       properties:
 *         propertyTypeId:
 *           type: string
 *           description: The property type id
 */

/**
 * @swagger
 * tags:
 *   name: Properties
 *   description: The Properties managing API
 */

/**
 * @swagger
 * /api/property/create:
 *   post:
 *     summary: Create a new property
 *     tags: [Properties]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Property'
 *     responses:
 *       200:
 *         description: The property was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Property'
 *       500:
 *         description: Some server error
 */
router.post('/create', propertyValidationRules(), validate, createProperty);

export default router;