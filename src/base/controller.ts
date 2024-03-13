import { Context } from 'koa';

import { plainToClass, plainToInstance } from 'class-transformer';
import { Contains, IsString, ValidationError, validate } from 'class-validator';

export class Controller {
  public static async handle(methodName: string | symbol, ctx: Context) {
    const method = this[methodName];
    const dtos = Reflect.getMetadata('::dtos', this, methodName) || [];
    const paramTypes = Reflect.getMetadata('::paramtypes', this, methodName) || [];

    try {
      const args = await Promise.all(paramTypes.map( async(paramType: any, index: number) => {
        const dto = dtos.find((dto: any) => dto.dtoClass === paramType);
        if(dto) {
          const instance = plainToInstance(dto.dtoClass, dto.extractor(ctx), {
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
          return instance
        }

        if(paramType === 'Context') {
            return ctx
        }
      }));

      return method.apply(this, args);
    } catch(e) {
      ctx.status = 400
      ctx.body = { "error": "bad request" }
      return
    }
  }
}

type WrappableController = typeof Controller

type WithContext<T> = {
  [P in keyof T]: T[P] extends (...args: any) => any ? (ctx: Context) => ReturnType<T[P]> : T[P];
};

export function Wrap<T>(ctl: T & WrappableController): WithContext<T & WrappableController> {
  return new Proxy(ctl as object, {
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
  }) as WithContext<T & WrappableController>;
}