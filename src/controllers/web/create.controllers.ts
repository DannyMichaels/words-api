import { Response, Request } from 'express';

export const index = async (req: Request, res: Response) => {
  try {
    return res.render('pages/create', {
      title: 'Words API | Create Word',
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};