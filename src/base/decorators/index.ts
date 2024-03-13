export function Dto(dtoClass: Function, extractor: (req: any) => any) {
  return function(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const existingDtos = Reflect.getMetadata('::dtos', target, propertyKey) || [];
    existingDtos.push({ dtoClass, extractor });
    Reflect.defineMetadata('::dtos', existingDtos, target, propertyKey);
  };
}

export function InputArg(dtoClass: Function) {
  return function(target: any, propertyKey: string, parameterIndex: number) {
    const paramTypes = Reflect.getMetadata('::paramtypes', target, propertyKey) || [];
    paramTypes[parameterIndex] = dtoClass;
    Reflect.defineMetadata('::paramtypes', paramTypes, target, propertyKey);
  };
}

export function ContextArg() {
  return function ContextArg(target: any, propertyKey: string, parameterIndex: number) {
    const paramTypes = Reflect.getMetadata('::paramtypes', target, propertyKey) || [];
    paramTypes[parameterIndex] = 'Context';
    Reflect.defineMetadata('::paramtypes', paramTypes, target, propertyKey);
  };
}