import { Response, Request } from 'express';

export const index = async (req: Request, res: Response) => {
  try {
    return res.render('pages/home', {
      title: 'Words API',
      message: 'Hello there!',

      // the mouse partial
      mousePartialText: 'Scroll for more',
      mousePartialClickScrollSection: '#endpoints',
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
