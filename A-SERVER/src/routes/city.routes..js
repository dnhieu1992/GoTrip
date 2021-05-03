import express from 'express';
import {
    createCity,
    updateCity,
    search,
    getById,
    deleteCity
} from '../controllers/city.controller.js';

const router = express.Router();

router.post('/city/create', createCity);
router.put('/city/update', updateCity);
router.get('/city/search', search);
router.get('/city/getById', getById);
router.delete('/city/delete', deleteCity);

export default router;