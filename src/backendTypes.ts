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
