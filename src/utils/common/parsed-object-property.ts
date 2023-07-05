import { isJson } from './is-json';

export function parseObjectProperty(obj: Record<string, any>) {
  const newObj = { ...obj };
  for (let key in newObj) {
    if (isJson(newObj[key])) {
      newObj[key] = JSON.parse(newObj[key]);
    }
  }
  return newObj;
}
