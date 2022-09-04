export function loggable(target: Function) {
  for (const propertyName of Object.keys(target)) {
    const descriptor = Object.getOwnPropertyDescriptor(target, propertyName);
    const isMethod = descriptor?.value instanceof Function;
    if (!isMethod)
      continue;

    const originalMethod = descriptor.value;
    descriptor.value = function (...args: any[]) {
      const [{ method, path }] = args
      console.log(method, path, `${target.name}.${propertyName}`)
      return originalMethod.apply(this, args);
    };

    Object.defineProperty(target, propertyName, descriptor);
  }
}