import axios from "axios";
import { User, PostRequest, responseStatus, Credentials } from "./backendTypes";

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

export const postRequest = async ({
  path,
  payload,
}: {
  path: string;
  payload: object;
}) => {
  try {
    const response = await axios.post<PostRequest>(
      `${process.env.REACT_APP_URL}/${path}`,
      { ...payload },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "content-type": "application/json",
        },
      }
    );
    console.log(response);
    return response.status;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return responseStatus.ERR_UNAUTHORIZED;
    } else {
      console.log(error);
    }
  }
};
export const patchRequest = async ({
  path,
  payload,
}: {
  path: string;
  payload: object;
}) => {
  try {
    const response = await axios.patch(
      `${process.env.REACT_APP_URL}/${path}`,
      { ...payload },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "content-type": "application/json",
        },
      }
    );
    console.log(response);
    return response.status;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return -1;
    } else {
      console.log(error);
    }
  }
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
