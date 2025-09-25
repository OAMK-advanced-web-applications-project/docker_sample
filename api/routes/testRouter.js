import { Router } from 'express';
import { getTest } from '../controllers/TestController.js';

const router = Router();

router.get('/',getTest);

export default router;