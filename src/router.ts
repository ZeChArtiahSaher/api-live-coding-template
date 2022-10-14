import * as Router from 'koa-router';
import IndexController from './controllers/index.controller';

const router = new Router();

router.get('/resource', IndexController.getData);

export default router;
