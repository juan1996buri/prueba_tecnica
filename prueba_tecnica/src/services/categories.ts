import axios from "axios";

import { CategoryType } from "@/type.ds";
import { axiosInstance } from "./axiosInstance";

export const findAllCategories = async (): Promise<CategoryType[]> => {
  try {
    const response = await axiosInstance.get("/categories");

    if (response.status !== 200) {
      throw new Error(`HTTP Error: ${response.status}`);
    }

    return response.data as CategoryType[];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      throw error; // Lanzamos el error tal cual si es de Axios
    } else {
      throw new Error("Unexpected error occurred");
    }
  }
};
export const deleteOneCategory = async (
  categoryId: CategoryType["id"],
): Promise<boolean> => {
  try {
    const response = await axiosInstance.delete(`/categories/${categoryId}`);

    if (response.status !== 200) {
      throw new Error(`HTTP Error: ${response.status}`);
    }
    return response.data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      throw error;
    } else {
      throw new Error("Unexpected error occurred");
    }
  }
};

export const createOneCategory = async (
  categoryItem: CategoryType,
): Promise<CategoryType> => {
  try {
    const response = await axiosInstance.post("/categories/", {
      name: categoryItem.name,
      image: categoryItem.image,
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
export const updateOneCategory = async (
  categoryItem: CategoryType,
): Promise<CategoryType> => {
  try {
    const response = await axiosInstance.put(`/categories/${categoryItem.id}`, {
      name: categoryItem.name,
      image: categoryItem.image,
    });

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
