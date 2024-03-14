import { Services } from '@/services.init'
import { Context, Middleware } from "koa";

export const bindServices = (services: Services): Middleware => {
  return async function(ctx: Context, next) {
    ctx.services = services
    await next() 
  }
}