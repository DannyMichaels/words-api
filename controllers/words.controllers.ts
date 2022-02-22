import words from '../words';
import sample from '../utils/sample';

export const getOneRandomWord = async (req, res) => {
  try {
    const randomWord = sample(words);

    return res.status(200).json({ word: randomWord });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
