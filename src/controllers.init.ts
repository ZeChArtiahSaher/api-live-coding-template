import * as Router from 'koa-router';

import { Wrap } from '@/base/controller'
import IndexController from './controllers/index.controller';
import AuthController from '@/controllers/auth.controller'

export const bindControllers = async(services) => {
  

  const IndexHandle = Wrap(IndexController)
  const AuthHandle = Wrap(AuthController)

  const router = new Router();

  router.get('/resource', IndexHandle.getData);
  router.post('/user', IndexHandle.setUser);

  router.post('/auth/by-password', AuthHandle.byPassword);
  
  return router
  
  // app.use(router.routes()).use(router.allowedMethods());
}
