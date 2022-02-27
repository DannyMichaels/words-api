import Router from 'express';
import * as Home from '../controllers/web/home.controllers';
import * as Create from '../controllers/web/create.controllers';
import csrf from 'csurf';

const router = Router();

const csrfProtection = csrf({ cookie: true });

router.get(['/', '/home'], Home.index); // GET
router.get(['/words/create', '/words/new'], csrfProtection, Create.index); // GET
router.post(['/words/create', '/words/new'], csrfProtection, Create.create); // GET

export default router;
