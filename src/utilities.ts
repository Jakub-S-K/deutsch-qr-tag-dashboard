import axios from "axios";
import { User, responseStatus, Credentials, Question } from "./backendTypes";

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
const GET_BOILERPLATE = async (path: string, params?: {}) => {
  try {
    const response = await api
      .get(path, {
        headers: { Authorization: Token() },
        params: params,
      })
      .then(({ data }) => data);
    return response;
  } catch (error) {
    return { status: handleError(error) };
  }
};

export const getUsers = async () => {
  return GET_BOILERPLATE("api/users");
};
export const getUser = async (id: string | undefined) => {
  return GET_BOILERPLATE(`api/user/${id}`);
};
export const getQuestions = async () => {
  return GET_BOILERPLATE("api/questions");
};
export const getQuestion = async (id: string | undefined) => {
  return GET_BOILERPLATE(`api/question/${id}`);
};

const DELETE_BOILERPLATE = async (path: string, params?: {}) => {
  try {
    const response = await api
      .delete(path, {
        headers: { Authorization: Token() },
        params: params,
      })
      .then(({ status }) => status);
    return response;
  } catch (error) {
    handleError(error);
  }
};

export const deleteUser = async (id: string | undefined) => {
  return DELETE_BOILERPLATE(`api/user/${id}`);
};
export const deleteQuestion = async (id: string | undefined) => {
  return DELETE_BOILERPLATE(`api/question/${id}`);
};

const POST_BOILERPLATE = async (path: string, payload: object, params?: {}) => {
  try {
    const response = await api
      .post(path, payload, {
        headers: { Authorization: Token() },
        params: params,
      })
      .then(({ data, status }) => ({ data: data, status: status }));
    return response;
  } catch (error) {
    handleError(error);
  }
};

export const addUser = async (user: Partial<User>) => {
  return POST_BOILERPLATE(`api/user`, user);
};
export const addQuestion = async (question: Partial<Question>) => {
  return POST_BOILERPLATE(`api/question`, question);
};

const PATCH_BOILERPLATE = async (
  path: string,
  payload: object,
  params?: {}
) => {
  try {
    const response = await api
      .patch(path, payload, {
        headers: { Authorization: Token() },
        params: params,
      })
      .then(({ data, status }) => ({ data: data, status: status }));
    return response;
  } catch (error) {
    handleError(error);
  }
};

export const editUser = async (id: string, user: Partial<User>) => {
  return PATCH_BOILERPLATE(`api/user/${id}`, user);
};
export const editQuestion = async (id: string, question: Partial<Question>) => {
  return PATCH_BOILERPLATE(`api/question/${id}`, question);
};

export const validate = async ({
  path = "api/access_test",
  requestType = "GET",
}: {
  path?: string;
  requestType?: "GET" | "POST";
}) => {
  if (!localStorage.getItem("token")) {
    return responseStatus.ERR_UNAUTHORIZED;
  }
  if (requestType === "GET") {
    try {
      const response = await axios.get<User[]>(
        `${process.env.REACT_APP_URL}/${path}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "content-type": "application/json",
          },
        }
      );
      if (response.status === responseStatus.ERR_UNAUTHORIZED) {
        localStorage.removeItem("token");
        return responseStatus.ERR_UNAUTHORIZED;
      }
      return response.status;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === responseStatus.ERR_UNAUTHORIZED) {
          localStorage.removeItem("token");
        }
        return error.response?.status;
      } else {
        console.log(error);
      }
    }
  }
};
export const getToken = async ({ username, password }: Credentials) => {
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_URL}/api/login`,
      { username: username, password: password },
      {
        headers: {
          "content-type": "application/json",
        },
      }
    );
    console.log(response);
    if (typeof response.data.token !== "undefined") {
      localStorage.setItem("token", response.data.token);
      return response.status;
    }
    return response.status;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return error.response?.status;
    } else {
      console.log(error);
    }
  }
};
