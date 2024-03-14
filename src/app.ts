import * as Koa from 'koa';
import * as bodyParser from 'koa-bodyparser';
import * as cors from '@koa/cors';
import * as helmet from 'koa-helmet';
import * as json from 'koa-json';
import 'reflect-metadata';
import { initControllers } from './controllers.init';
import { initServices } from '@/services.init'
import { bindServices } from '@/middleware/bind-svc'

const app = new Koa();
const port = process.env.PORT || 3000;

app.use(helmet());
app.use(cors());
app.use(json());
app.use(bodyParser());

app.listen(port, async() => {
  console.log('binding services...')
  const services = await initServices()
  
  app.use(bindServices(services))
  
  console.log('binding controllers...')
  
  const router = await initControllers(services)
  
  app
    .use(router.routes())
    .use(router.allowedMethods())

  console.log(`🚀 App listening on the port ${port}`);
});

export = app