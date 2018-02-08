import { Router } from 'express';

import ping from './ping';


const router = Router();

router.get('/ping', ping);


export default router;
