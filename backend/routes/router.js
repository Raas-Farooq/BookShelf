import express from 'express';
import controller from '../controllers/controller.js';


const router = express.Router();


router.get('/EffortTest', controller.getAll);
router.post('/addBook', controller.addBook);


export default router;