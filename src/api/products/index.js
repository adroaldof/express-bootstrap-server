import { Router } from 'express';

import create from './create';
import list from './list';
import remove from './remove';


const router = Router();

router.delete('/:id', remove);
router.get('/', list);
router.post('/', create);


export default router;
