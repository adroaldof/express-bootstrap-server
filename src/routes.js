import { Router } from 'express';

import core from './api/core';


const router = Router();

router.use(core);


export default router;
