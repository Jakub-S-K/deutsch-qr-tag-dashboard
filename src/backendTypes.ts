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
