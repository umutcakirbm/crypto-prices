export type JSONValue = string | number | boolean | JSONObject | JSONArray;

export interface JSONObject {
  [x: string]: JSONValue;
}

export interface JSONArray extends Array<JSONObject | JSONValue> {}

export type JSONType = JSONObject | JSONArray | JSONValue;