import express from 'express';
import {
    createPropertyType,
    updatePropertyType,
    search,
    getById,
    deletePropertyType
} from '../controllers/propertyType.controller.js';

const router = express.Router();

router.post('/propertyType/create', createPropertyType);
router.put('/propertyType/update', updatePropertyType);
router.get('/propertyType/search', search);
router.get('/propertyType/getById', getById);
router.delete('/propertyType/delete', deletePropertyType);

export default router;