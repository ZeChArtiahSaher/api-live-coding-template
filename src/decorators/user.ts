import { Services } from '@/services.init'
import { JwtService } from '@/services/jwt.service'
import { Context } from 'koa-swagger-decorator'

export function UseUser() {
  return function(target: any, propertyKey: string,
    descriptor: PropertyDescriptor) {

    const uses = Reflect.getMetadata('::method-middleware', target, propertyKey) || [];

    uses.push({
      type: 'guard',
      payload: userGuard
    });

    Reflect.defineMetadata('::method-middleware', uses, target, propertyKey);
  };
}

export function UserArg() {
  return function(target: any, propertyKey: string, parameterIndex: number) {
    const argTypes = Reflect.getMetadata('::argtypes', target, propertyKey) || [];
    argTypes[parameterIndex] = { 
      type: 'key',
      handle: ctx => ctx.user
    };
    Reflect.defineMetadata('::argtypes', argTypes, target, propertyKey);
  };
}

const userGuard = (ctx: Context) => {
  const services: Services = ctx.services

  const jwtBearer = ctx.headers?.['authorization']?.split('Bearer')?.[1]?.trim()
  
  if(!jwtBearer) {
    ctx.throw(401, 'Unauthorized')
  }

  let user = null
  try {
    user = services.jwtService.verifyAndDecode(jwtBearer)
  } catch(e) {
    // just for the lols
    console.log(e)
  }
  
  if(!user) {
    ctx.throw(401, 'Unauthorized')
  }
  
  ctx.user = user
}
