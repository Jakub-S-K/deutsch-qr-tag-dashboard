import axios from "axios";
import { redirect } from "react-router-dom";
import { User, PostRequest, responseStatus } from "./backendTypes";

export const loader = async ({
  path,
}: {
  path: string;
  requestType?: "GET";
  payload?: any;
}) => {
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
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === responseStatus.ERR_UNAUTHORIZED) {
        return responseStatus.ERR_UNAUTHORIZED;
      }
    } else {
      console.log(error);
    }
  }
};
export const deleteRequest = async ({ path }: { path: string }) => {
  try {
    const response = await axios.delete<number>(
      `${process.env.REACT_APP_URL}/${path}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "content-type": "application/json",
        },
      }
    );
    return response.status;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log(error);
      return responseStatus.ERR_UNAUTHORIZED;
    } else {
      console.log(error);
    }
  }
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
    localStorage.setItem("token", "");
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
        return responseStatus.ERR_UNAUTHORIZED;
      }
      return response.status;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return responseStatus.ERR_UNAUTHORIZED;
      } else {
        console.log(error);
      }
    }
  }
};
