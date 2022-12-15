export interface Credentials {
  username: string | undefined;
  password: string | undefined;
}
export interface User {
  _id: string;
  name: string;
  surname: string;
}
export interface payloadQuestion {
  question: string;
  answers: string[];
  answer: number[];
}
export interface Question extends payloadQuestion {
  _id: string;
}
export interface Response<T = any> {
  status: number;
  data?: T;
}
export enum responseStatus {
  NO_ALERT = 0,
  SUCCESS = 200,
  ERR_BAD_REQUEST = 400,
  ERR_UNAUTHORIZED = 401,
  ERR_NOT_FOUND = 404,
  ERR_ALREADY_EXISTS = 409,
  ERR_INTERNAL = 500,
}

export interface Token {
  id: string;
  iat: EpochTimeStamp;
  exp: EpochTimeStamp;
}

export const isUser = (obj: any): obj is User => {
  return !!obj && "_id" in obj && "name" in obj && "surname" in obj;
};
export const isResponse = (obj: any): obj is Response => {
  return !!obj && "status" in obj;
};
export const isResponseWithData = (obj: any): obj is Response => {
  return isResponse(obj) && "data" in obj;
};
export const isUserArr = (obj: any): obj is User[] => {
  return Array.isArray(obj) && obj.every((value) => isUser(value));
};
