const { Router } = require('express');
const router = Router();

import { getOneRandomWord } from '../controllers/words.controllers';

router.get('/word/random', getOneRandomWord); // GET

export default router;
