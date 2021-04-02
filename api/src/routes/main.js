import express from 'express';
import { createCourse, getAllCourse, getSingleCourse, updateCourse, deleteCourse } from '../controllers/course.js';
import { createUser } from '../controllers/user.controller.js';


const router = express.Router();
router.post('/createCourse', createCourse);
router.get('/courses', getAllCourse);
router.get('/courses/:courseId', getSingleCourse);
router.patch('/courses/:courseId', updateCourse);
router.delete('/courses/:courseId', deleteCourse);

//User management
router.post('/user/create', createUser);

export default router;