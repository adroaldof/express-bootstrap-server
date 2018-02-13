import { Router } from 'express';

import create from './create';
import detail from './detail';
import list from './list';
import remove from './remove';


const router = Router();

router.delete('/:id', remove);
router.get('/', list);
router.get('/:id', detail);
router.post('/', create);


export default router;
