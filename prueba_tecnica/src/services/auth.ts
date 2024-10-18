import axios from "axios";
import { axiosInstance } from "./axiosInstance";

export interface loginType {
  email: string;
  password: string;
}

export interface UserType {
  id?: number;
  name: string;
  email: string;
  password: string;
  avatar: string;
  role?: string;
}

export interface TokensType {
  access_token: string;
  refresh_token: string;
}

export const loginUser = async (login: loginType): Promise<TokensType> => {
  try {
    const response = await axiosInstance.post("/auth/login", {
      email: login.email,
      password: login.password,
    });
    if (response.status !== 201) {
      throw new Error(`HTTP Error: ${response.status}`);
    }

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw error;
    } else {
      throw new Error("Unexpected error occurred");
    }
  }
};

export const getUserWithSession = async (): Promise<UserType> => {
  try {
    const response = await axiosInstance.get("/auth/profile");
    if (response.status !== 200) {
      throw new Error(`HTTP Error: ${response.status}`);
    }
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw error;
    } else {
      throw new Error("Unexpected error occurred");
    }
  }
};

export const registerOneUser = async (
  userItem: UserType,
): Promise<UserType> => {
  try {
    const response = await axiosInstance.post("/users/", {
      name: userItem.name,
      email: userItem.email,
      password: userItem.password,
      avatar: userItem.avatar,
    });
    if (response.status !== 201) {
      throw new Error(`HTTP Error: ${response.status}`);
    }
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw error;
    } else {
      throw new Error("Unexpected error occurred");
    }
  }
};
