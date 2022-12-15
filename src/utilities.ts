import axios from "axios";
import {
  User,
  responseStatus,
  Credentials,
  Question,
  Token as TokenType,
  Response,
} from "./backendTypes";
import jwtDecode from "jwt-decode";

const Token = (): string => {
  const token = localStorage.getItem("token");
  if (token) {
    return `Bearer ${token}`;
  }
  return "";
};
const api = axios.create({
  baseURL: process.env.REACT_APP_URL,
  headers: {
    "content-type": "application/json",
  },
});

function handleError(error: unknown): number {
  if (axios.isAxiosError(error)) {
    console.log(error);
    if (error.response?.status === responseStatus.ERR_UNAUTHORIZED) {
      return responseStatus.ERR_UNAUTHORIZED;
    }
    if (error.response?.status === responseStatus.ERR_NOT_FOUND) {
      return responseStatus.ERR_NOT_FOUND;
    }
    return responseStatus.ERR_INTERNAL;
  } else {
    console.log(error);
    return responseStatus.ERR_INTERNAL;
  }
}
const GET_BOILERPLATE = async <T = any>(
  path: string,
  params?: {}
): Promise<Response<T>> => {
  try {
    const response = await api
      .get(path, {
        headers: { Authorization: Token() },
        params: params,
      })
      .then(({ data, status }) => ({ data, status }));
    return response;
  } catch (error) {
    return { status: handleError(error) };
  }
};

export const getUsers = async () => {
  return GET_BOILERPLATE<User[]>("api/users");
};
export const getUser = async (id: string | undefined) => {
  return GET_BOILERPLATE<User>(`api/user/${id}`);
};
export const getQuestions = async () => {
  return GET_BOILERPLATE<Question[]>("api/questions");
};
export const getQuestion = async (id: string | undefined) => {
  return GET_BOILERPLATE<Question>(`api/question/${id}`);
};

const DELETE_BOILERPLATE = async <T = any>(
  path: string,
  params?: {}
): Promise<Response<T>> => {
  try {
    const response = await api
      .delete(path, {
        headers: { Authorization: Token() },
        params: params,
      })
      .then(({ status }) => ({ status }));
    return response;
  } catch (error) {
    return { status: handleError(error) };
  }
};

export const deleteUser = async (id: string | undefined) => {
  return DELETE_BOILERPLATE(`api/user/${id}`);
};
export const deleteQuestion = async (id: string | undefined) => {
  return DELETE_BOILERPLATE(`api/question/${id}`);
};

const POST_BOILERPLATE = async <T = any>(
  path: string,
  payload: object,
  params?: {}
): Promise<Response<T>> => {
  try {
    const response = await api
      .post(path, payload, {
        headers: { Authorization: Token() },
        params: params,
      })
      .then(({ data, status }) => ({ data: data, status: status }));
    return response;
  } catch (error) {
    return { status: handleError(error) };
  }
};

export const addUser = async (user: Partial<User>) => {
  return POST_BOILERPLATE<{ _id: string }>(`api/user`, user);
};
export const addQuestion = async (question: Partial<Question>) => {
  return POST_BOILERPLATE<{ _id: string }>(`api/question`, question);
};

const PATCH_BOILERPLATE = async <T = any>(
  path: string,
  payload: object,
  params?: {}
): Promise<Response<T>> => {
  try {
    const response = await api
      .patch(path, payload, {
        headers: { Authorization: Token() },
        params: params,
      })
      .then(({ data, status }) => ({ data: data, status: status }));
    return response;
  } catch (error) {
    return { status: handleError(error) };
  }
};

export const editUser = async (id: string, user: Partial<User>) => {
  return PATCH_BOILERPLATE(`api/user/${id}`, user);
};
export const editQuestion = async (id: string, question: Partial<Question>) => {
  return PATCH_BOILERPLATE(`api/question/${id}`, question);
};

export const validate = () => {
  try {
    if (!localStorage.getItem("token")) {
      return responseStatus.ERR_UNAUTHORIZED;
    }
    const { exp } = jwtDecode<TokenType>(localStorage.getItem("token")!);
    if (Date.now() < exp * 1000) {
      return responseStatus.SUCCESS;
    } else {
      localStorage.removeItem("token");
      return responseStatus.ERR_INTERNAL;
    }
  } catch (error) {
    localStorage.removeItem("token");
    return handleError(error);
  }
};
export const getToken = async ({ username, password }: Credentials) => {
  const response = await POST_BOILERPLATE<{ token: string }>("api/login", {
    username: username,
    password: password,
  });
  if (response?.data?.token !== undefined) {
    localStorage.setItem("token", response!.data.token);
  }
  return response!.status;
};
