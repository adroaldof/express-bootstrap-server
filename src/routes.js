import { Router } from 'express';

import core from './api/core';
import products from './api/products';


const router = Router();

router.use('/products', products);
router.use(core);


export default router;
