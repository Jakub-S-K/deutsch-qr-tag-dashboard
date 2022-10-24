import axios from "axios";
import { redirect } from "react-router-dom";
import { User } from "./backendTypes";

export const loader = async ({
  path,
  requestType = "GET",
}: {
  path: string;
  requestType?: "GET" | "POST";
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
        {},
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
      return response.data;
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
  path = "api/users",
  requestType = "GET",
}: {
  path?: string;
  requestType?: "GET" | "POST";
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
      return redirect("/");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return redirect("/login");
      } else {
        console.log(error);
      }
    }
  }
};
