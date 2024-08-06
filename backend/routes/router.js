import express from 'express';
import controller from '../controllers/controller.js';


const router = express.Router();


router.get('/EffortTest', controller.getAll);
router.post('/addBook', controller.addBook);
router.put('/editBook/:id', controller.validateBookEdit, controller.editBook);
router.delete('/deleteBook', controller.deleteBook);


export default router;