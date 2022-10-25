import axios from "axios";
import { redirect } from "react-router-dom";
import { User } from "./backendTypes";

export const loader = async ({
  path,
  requestType = "GET",
  payload = {},
}: {
  path: string;
  requestType?: "GET" | "POST" | "PATCH";
  payload?: any;
}) => {
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
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return redirect("/login");
      } else {
        console.log(error);
      }
    }
  }
  if (requestType === "POST") {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_URL}/${path}`,
        { ...payload },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "content-type": "application/json",
          },
        }
      );
      if (response.status === 401) {
        return redirect("/login");
      }
      console.log(response);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return redirect("/login");
      } else {
        console.log(error);
      }
    }
  }
  if (requestType === "PATCH") {
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
      if (response.status === 401) {
        return redirect("/login");
      }
      console.log(response);
      return response.status;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return redirect("/login");
      } else {
        console.log(error);
      }
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
    return;
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
      if (response.status === 401) {
        return;
      }
      return redirect("/");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return;
      } else {
        console.log(error);
      }
    }
  }
};
