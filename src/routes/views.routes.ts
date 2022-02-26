import Router from 'express';
import * as Home from '../controllers/web/home.controllers';
import * as Create from '../controllers/web/create.controllers';

const router = Router();

router.get(['/', '/home'], Home.index); // GET
router.get(['/create', '/new'], Create.index); // GET

export default router;
