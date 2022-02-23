import WORDS from '../utils/words';
import sample from '../utils/sample';
import { Response, Request } from 'express';

export const getAllWords = async (_req: Request, res: Response) => {
  try {
    return res.status(200).json(WORDS);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const getOneRandomWord = async (_req: Request, res: Response) => {
  try {
    const randomWord = sample(WORDS);

    return res.status(200).json(randomWord);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const getRandomWords = async (req: Request, res: Response) => {
  let { count = 1 }: any = req.query;

  if (count < 1) {
    return res
      .status(500)
      .json({ error: 'word count has to be greater or equal to 1' });
  }

  if (count > WORDS.length) {
    return res.status(500).json({ error: 'word count is too high' });
  }

  try {
    const randomWords = [];

    while (count--) {
      const randomWord = sample(WORDS);
      randomWords.push(randomWord);
    }

    return res.status(200).json(randomWords);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
