import WORDS from '../utils/words';
import { Response, Request } from 'express';
import Word, { TWord } from '../models/word.model';

export const getAllWords = async (req: Request, res: Response) => {
  try {
    const pool = req.pool;

    const words = await Word.findAll(pool);
    return res.status(200).json(words);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const getRandomWords = async (req: Request, res: Response) => {
  const pool = req.pool;
  const { count = 1 }: any = req.query;

  if (count < 1) {
    return res
      .status(500)
      .json({ error: 'word count has to be greater or equal to 1' });
  }

  if (count > WORDS.length) {
    return res.status(500).json({ error: 'word count is too high' });
  }

  try {
    const randomWords = await Word.findRandom(pool, count);
    return res.status(200).json(randomWords);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const findById = async (req: Request, res: Response) => {
  try {
    const pool = req.pool;
    const oneWord = await Word.findById(pool, Number(req.params.id));
    return res.status(200).json(oneWord.textContent);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const create = async (req: Request, res: Response) => {
  try {
    const pool = req.pool;
    const { textContent, createdBy = 'anonymous' } = req.body;

    const createdWord = await Word.create(pool, {
      textContent,
      createdBy,
      createdAt: new Date().toISOString(),
    });

    return res.status(200).json({
      status: 'success',
      word: createdWord,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
