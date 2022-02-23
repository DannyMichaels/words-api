import words from '../words';
import sample from '../utils/sample';
import { Response, Request } from 'express';

export const getAllWords = async (_req: Request, res: Response) => {
  try {
    return res.status(200).json({ words });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const getOneRandomWord = async (_req: Request, res: Response) => {
  try {
    const randomWord = sample(words);

    return res.status(200).json({ word: randomWord });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
