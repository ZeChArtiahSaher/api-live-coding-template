import { Context } from 'koa';

import { plainToClass, plainToInstance } from 'class-transformer';
import { Contains, IsString, ValidationError, validate } from 'class-validator';

// declare module "koa" {
//   interface Context {
//     dtos: any[]
//   }
// }

export class Controller {
  constructor() {}

  public async handle(methodName: string | symbol, ctx) {
    const method = this[methodName];
    
    const methodMiddleware = Reflect.getMetadata('::method-middleware', this, methodName) || [];
    
    ctx.dtos = []
    
    // Handle function decorators
    
    await Promise.all(methodMiddleware.map( async({ type, payload }) => {
      switch(type) {
        case 'dto':
          const instance = plainToInstance(payload.dtoClass, payload.extractor(ctx), {
          })
          
          const anyValidationErrors = await validate(instance, {
            whitelist: true,
            forbidNonWhitelisted: true,
            forbidUnknownValues: true
          })
      
          if (anyValidationErrors.length > 0) {
            console.log('[Validation error]: ', anyValidationErrors)
            throw new Error()
          }
          ctx.dtos.push([payload.dtoClass, instance])
          break
        case 'guard':
          await payload(ctx)
          break
      }
    }))
    

    // Handle args mapping / Argument decorators

    const argTypes = Reflect.getMetadata('::argtypes', this, methodName) || [];
    
    const args = await Promise.all(
      argTypes.map(at => at.handle(ctx))
    )

    return method.apply(this, args);
  }
}

type WithContext<T> = {
  [P in keyof T]: T[P] extends (...args: any) => any ? (ctx: Context) => ReturnType<T[P]> : T[P];
};

export function Wrap<T extends Controller>(ctl: T): WithContext<T> {
  return new Proxy(ctl, {
    get(target, propKey, receiver) {
      const origMethod = target[propKey];

      if (typeof origMethod === 'function') {
        return async function(...args: any[]) {
          const ctx = args[0];
          return await ctl.handle(propKey, ctx)
        };
      }

      return Reflect.get(target, propKey, receiver);
    }
  }) as WithContext<T>;
}
