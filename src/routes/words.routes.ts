import Router from 'express';
import {
  getAllWords,
  getRandomWords,
  findById,
  create,
  getOne,
} from '../controllers/api/words.controllers';

const router = Router();

router.get(['/words', '/words/all'], getAllWords); // GET
router.get('/words/random', getRandomWords);
router.get('/words/:id', findById); // GET
router.get('/word', getOne); // get one random word

router.post('/words/new', create); // POST

export default router;
