import { Response, Request } from 'express';
import Word from '../../models/word.model';

// @ts-ignore
import unescape from 'unescape';

export const index = async (req: Request, res: Response) => {
  try {
    return res.render('pages/create', {
      status: '',
      error: '',
      message: '',
      canRestart: false,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const create = async (req: Request, res: Response) => {
  try {
    const pool = req.pool;
    let { textContent, createdBy = 'anonymous' } = req.body;
    textContent = unescape(textContent.trim());
    createdBy = unescape(createdBy.trim());

    const foundWord = await Word.findByName(pool, { textContent });

    if (foundWord) {
      return res.status(500).render('pages/create', {
        status: 'error',
        message: 'Word already exists',
        canRestart: true,
      });
    }

    const createdWord = await Word.create(pool, {
      textContent,
      createdBy,
      createdAt: new Date().toISOString(),
    });

    return res.status(200).render('pages/create', {
      status: 'success',
      message: `New word (${createdWord.textContent}) created successfuly!`,
      newlyCreatedWord: createdWord.textContent,
      canRestart: true,
    });
  } catch (error) {
    return res.status(500).render('pages/create', {
      status: 'error',
      message: error.message,
      canRestart: true,
    });
  }
};
