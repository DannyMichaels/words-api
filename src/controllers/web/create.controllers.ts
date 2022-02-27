import { Response, Request } from 'express';
import Word from '../../models/word.model';
import { validateEmail } from '../../utils/validateEmail';

// @ts-ignore
import unescape from 'unescape';

export const index = async (req: Request, res: Response) => {
  try {
    return res.render('pages/create', {
      status: '',
      error: '',
      message: '',
      canRestart: false,
      csrfToken: req.csrfToken(),
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const create = async (req: Request, res: Response) => {
  try {
    const pool = req.pool;
    let { textContent, createdBy = 'anonymous', restart = 'false' } = req.body;

    restart = unescape(restart);

    if (restart === 'true') {
      return res.render('pages/create', {
        status: '',
        error: '',
        message: '',
        canRestart: false,
        csrfToken: req.csrfToken(),
      });
    }

    textContent = unescape(textContent.trim().toLowerCase());
    createdBy = unescape(createdBy.trim());

    const foundWord = await Word.findByName(pool, { textContent });

    if (foundWord) {
      return res.status(500).render('pages/create', {
        status: 'error',
        message: `Word ${textContent} already exists`,
        canRestart: true,
        csrfToken: req.csrfToken(),
      });
    }

    if (!validateEmail(createdBy)) {
      return res.status(500).render('pages/create', {
        status: 'error',
        message: `Invalid email`,
        canRestart: true,
        csrfToken: req.csrfToken(),
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
      csrfToken: req.csrfToken(),
    });
  } catch (error) {
    return res.status(500).render('pages/create', {
      status: 'error',
      message: error.message,
      canRestart: true,
      csrfToken: req.csrfToken(),
    });
  }
};
