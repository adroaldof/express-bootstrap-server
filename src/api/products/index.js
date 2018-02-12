import { Router } from 'express';

import list from './list';
import remove from './remove';


const router = Router();

router.get('/', list);
router.delete('/:id', remove);


export default router;
