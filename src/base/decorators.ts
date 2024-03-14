export function Dto(dtoClass: Function, extractor: (req: any) => any) {
  return function(target: any, propertyKey: string, descriptor: PropertyDescriptor) {

    const existingDtos = Reflect.getMetadata('::method-middleware', target, propertyKey) || [];

    existingDtos.push({ 
      type: 'dto', 
      payload: { dtoClass, extractor }
    });

    Reflect.defineMetadata('::method-middleware', existingDtos, target, propertyKey);
  };
}

export function DtoInputArg(dtoClass: Function) {
  return function(target: any, propertyKey: string, parameterIndex: number) {
    const argTypes = Reflect.getMetadata('::argtypes', target, propertyKey) || [];
    argTypes[parameterIndex] = { 
      type: 'dto',
      handle: (ctx) => {
        const dto = ctx.dtos.find(([cls, inst]) => cls === dtoClass)
      
        if(dto) {
          const [cls, inst] = dto
          return inst
        }
      }
    };
    Reflect.defineMetadata('::argtypes', argTypes, target, propertyKey);
  };
}

export function ContextArg() {
  return function(target: any, propertyKey: string, parameterIndex: number) {
    const argTypes = Reflect.getMetadata('::argtypes', target, propertyKey) || [];
    argTypes[parameterIndex] = { 
      type: 'key', 
      handle: ctx => ctx
    };
    Reflect.defineMetadata('::argtypes', argTypes, target, propertyKey);
  };
}

export function ControllerHandle() {
  return function(constructor: Function) {
    // Reflect.defineMetadata('::argsTypes', target)
    // console.log(constructor)
  };
}