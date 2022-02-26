import { Response, Request } from 'express';
import API_ENDPOINTS from '../../utils/api-endpoints';

export const index = async (req: Request, res: Response) => {
  try {
    return res.render('pages/home', {
      title: 'Words API',

      // the mouse partial
      mousePartialText: 'Scroll for more',
      mousePartialClickScrollSection: '#endpoints',

      // api-endpoint list items
      API_ENDPOINTS,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
