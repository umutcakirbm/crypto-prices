import { JSONArray, JSONObject, JSONType } from '../models/json';

function toCamelCase(str: string): string {
  const arr = str.split(/[_-]/);
  let newStr = '';
  for (let i = 1; i < arr.length; i++) {
    newStr += arr[i].charAt(0).toUpperCase() + arr[i].slice(1);
  }
  return arr[0] + newStr;
}

function camelizeResponseList(response: JSONArray): JSONArray {
  return response.map((item: JSONType) => {
    if (item instanceof Array) {
      return camelizeResponseList(item as JSONArray);
    } else if (item instanceof Object) {
      return camelizeResponse(item as JSONObject);
    }
    return item;
  });
}

export function camelizeResponse(response: JSONType): JSONObject {
  let newResponse = response;
  if (response instanceof Array || !(response instanceof Object)) {
    newResponse = { data: response };
  }
  return Object.entries(newResponse).reduce((map, [key, value]) => {
    let newValue = value;
    if (value instanceof Array) {
      newValue = camelizeResponseList(value);
    } else if (value instanceof Object) {
      newValue = camelizeResponse(value);
    }
    map[toCamelCase(key)] = newValue;
    return map;
  }, {} as JSONObject);
}
