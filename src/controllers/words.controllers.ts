import WORDS from '../utils/words';
import { Response, Request } from 'express';
import Word from '../models/word.model';

export const getAllWords = async (_req: Request, res: Response) => {
  try {
    const words = await Word.findAll();
    return res.status(200).json(words);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const getRandomWords = async (req: Request, res: Response) => {
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
    const randomWords = await Word.findRandom(count);
    return res.status(200).json(randomWords);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const findById = async (req: Request, res: Response) => {
  try {
    const oneWord = await Word.findById(Number(req.params.id));
    return res.status(200).json(oneWord.textContent);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
