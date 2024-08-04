import express from 'express';
import controller from '../controllers/controller.js';


const router = express.Router();


router.get('/EffortTest', controller.EffortTest);
router.get('/privilege', controller.privilege);


export default router;