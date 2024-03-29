export interface Credentials {
  username: string | undefined;
  password: string | undefined;
}
export interface payloadUser {
  name: string;
  surname: string;
}
export interface User extends payloadUser {
  _id: string;
}
export interface payloadQuestion {
  question: string;
  answers: string[];
  answer: number[];
}
export interface Question extends payloadQuestion {
  _id: string;
}
export interface payloadTeam {
  name: string;
  members: string[];
}
export interface Team extends Omit<payloadTeam, "members"> {
  _id: string;
  members: User[];
}
export interface OnlineInTeam {
  _id: string;
  team: string;
  count: number;
  membersCount: number;
  points:number;
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

export const isPayloadQuestion = (obj: any): obj is payloadQuestion => {
  return !!obj && "question" in obj && "answers" in obj && "answer" in obj;
};
export const isQuestion = (obj: any): obj is Question => {
  return isPayloadQuestion(obj) && "_id" in obj;
};
export const isQuestionArr = (obj: any): obj is Question[] => {
  return Array.isArray(obj) && obj.every((value) => isQuestion(value));
};

export const isTeam = (obj: any): obj is Team => {
  return (
    !!obj &&
    "_id" in obj &&
    "name" in obj &&
    "members" in obj &&
    isUserArr(obj.members)
  );
};
export const isTeamArr = (obj: any): obj is Team[] => {
  return Array.isArray(obj) && obj.every((value) => isTeam(value));
};
export const isOnlineInTeam = (obj: any): obj is OnlineInTeam => {
  return !!obj && "_id" in obj && "team" in obj && "count" in obj && "membersCount" in obj && "points" in obj;
};
export const isOnlineInTeamArr = (obj: any): obj is OnlineInTeam[] => {
  return Array.isArray(obj) && obj.every((value) => isOnlineInTeam(value));
};
