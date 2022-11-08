export interface Credentials {
  username: string | undefined;
  password: string | undefined;
}
export interface User {
  _id: string;
  name: string;
  surname: string;
}
export interface PostRequest {
  status: number;
  data: {
    _id: string;
  };
}
export enum responseStatus {
  SUCCESS = 200,
  ERR_BAD_REQUEST = 400,
  ERR_UNAUTHORIZED = 401,
  ERR_NOT_FOUND = 404,
  ERR_ALREADY_EXISTS = 409,
  ERR_INTERNAL = 500,
}
