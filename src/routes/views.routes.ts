import Router from 'express';
import * as Home from '../controllers/web/home.controllers';
import * as Create from '../controllers/web/create.controllers';

const router = Router();

router.get(['/', '/home'], Home.index); // GET
router.get(['/words/create', '/words/new'], Create.index); // GET
router.post(['/words/create', '/words/new'], Create.create); // GET

export default router;
