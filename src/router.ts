import * as Router from 'koa-router';
import IndexController from './controllers/index.controller';
import EventsController from './controllers/events.controller';

const router = new Router();

router.get('/resource', IndexController.getData);
router.get('/events', EventsController.getEvents)

export default router;
