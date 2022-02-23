import words from '../words';
import sample from '../utils/sample';

export const getAllWords = async (_req, res: Express.Response) => {
  try {
    return res.status(200).json({ words });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const getOneRandomWord = async (_req, res: Express.Response) => {
  try {
    const randomWord = sample(words);

    return res.status(200).json({ word: randomWord });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
