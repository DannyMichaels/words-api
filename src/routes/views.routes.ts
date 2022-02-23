import Router from 'express';
import * as Home from '../controllers/web/home.controllers';

const router = Router();

router.get(['/', '/home'], Home.index); // GET

export default router;
