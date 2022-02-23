import Router from 'express';
import {
  getOneRandomWord,
  getAllWords,
  getRandomWords,
} from '../controllers/words.controllers';

const router = Router();

router.get(['/words', '/words/all'], getAllWords); // GET
router.get('/word', getOneRandomWord); // GET
router.get('/words/random', getRandomWords);

export default router;
