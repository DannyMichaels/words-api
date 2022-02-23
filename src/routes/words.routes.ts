import Router from 'express';
import {
  getOneRandomWord,
  getAllWords,
} from '../controllers/words.controllers';

const router = Router();

router.get(['/words', '/words/all'], getAllWords); // GET

router.get(['/word', '/words/random'], getOneRandomWord); // GET

export default router;
