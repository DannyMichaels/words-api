import WORDS from '../../utils/words';
import { Response, Request } from 'express';
import Word from '../../models/word.model';
import { validateEmail } from '../../utils/validateEmail';

// @ts-ignore
import unescape from 'unescape';

export const getAllWords = async (req: Request, res: Response) => {
  try {
    const pool = req.pool;
    const { length = null }: any = req.query;

    let words;

    if (!length) {
      words = await Word.findAll(pool);
    } else {
      words = await Word.findAllByLength(pool, { length });
    }

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

    if (!oneWord) {
      return res.status(500).json({ error: 'Word not found with this id' });
    }

    return res.status(200).json(oneWord.textContent);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const create = async (req: Request, res: Response) => {
  try {
    const pool = req.pool;
    const { textContent, createdBy = 'anonymous' } = req.body;
    const cleanTextContent = unescape(textContent.trim().toLowerCase());
    const cleanCreatedBy = unescape(createdBy);

    const foundWord =
      (await Word.findByName(pool, { textContent: cleanTextContent })) || '';

    if (foundWord) {
      return res.status(500).json({ error: 'Word already exists' });
    }

    if (!validateEmail(createdBy)) {
      return res.status(500).json({
        error: `Invalid email`,
      });
    }

    const createdWord = await Word.create(pool, {
      textContent: cleanTextContent,
      createdBy: cleanCreatedBy,
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

export const getOne = async (req: Request, res: Response) => {
  try {
    const pool = req.pool;

    const oneWord = await Word.getOne(pool);
    return res.status(200).json(oneWord.textContent);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
