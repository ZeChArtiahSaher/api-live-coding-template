import * as Router from 'koa-router';

import { Wrap } from '@/base/controller'
import IndexController from '@/controllers/index.controller';
import AuthController from '@/controllers/auth.controller'
import { Services } from '@/services.init'

export const initControllers = async(services: Services) => {
  const indexCtl = new IndexController(services.dataService)
  const authCtl = new AuthController(services.jwtService)

  const IndexHandle = Wrap(indexCtl)
  const AuthHandle = Wrap(authCtl)

  const router = new Router();

  router.get('/resource', IndexHandle.getData);
  router.post('/user', IndexHandle.setUser);
  router.post('/user-elevated', IndexHandle.setUserAuthorized);

  router.post('/auth/by-password', AuthHandle.byPassword);
  
  return router
}
