import Router from 'express';
import {
  getAllWords,
  getRandomWords,
  findById,
} from '../controllers/words.controllers';

const router = Router();

router.get(['/words', '/words/all'], getAllWords); // GET
router.get(['/word', '/words/random'], getRandomWords);
router.get('/word/:id', findById); // GET

export default router;
