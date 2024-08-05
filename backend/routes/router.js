import express from 'express';
import controller from '../controllers/controller.js';


const router = express.Router();


router.get('/EffortTest', controller.getAll);
router.get('/privilege', controller.addBook);


export default router;