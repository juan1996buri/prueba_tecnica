import { ProductType } from "@/type.ds";
import axios from "axios";
import { axiosInstance } from "./axiosInstance";

export interface ProductFilters {
  categoryId?: string;
  name?: string;
  minPrice?: number;
  maxPrice?: number;
}

export const findAllProducts = async (
  filters: ProductFilters = {},
): Promise<ProductType[]> => {
  try {
    const queryParams = new URLSearchParams();

    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        queryParams.append(key, String(value));
      }
    });
    const url = `/products/?${queryParams.toString()}`;

    const response = await axiosInstance.get(url);

    if (response.status !== 200) {
      throw new Error(`HTTP Error: ${response.status}`);
    }

    return response.data as ProductType[];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      throw error; // Lanzamos el error tal cual si es de Axios
    } else {
      throw new Error("Unexpected error occurred");
    }
  }
};
export const deleteOneProduct = async (
  productId: ProductType["id"],
): Promise<boolean> => {
  try {
    const response = await axiosInstance.delete(`/products/${productId}`);

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

export const createOneProduct = async (
  productItem: ProductType,
): Promise<ProductType> => {
  try {
    const response = await axiosInstance.post("/products/", {
      title: productItem.title,
      price: productItem.price,
      description: productItem.description,
      categoryId: productItem.category.id,
      images: productItem.images,
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
export const updateOneProduct = async (
  productItem: ProductType,
): Promise<ProductType> => {
  try {
    const images: Array<string> = [];
    productItem.images.map((item) => {
      let cleanedString = item.replace(/^\[|\]$/g, "");
      cleanedString = cleanedString.replace(/^"|"$/g, "");
      images.push(cleanedString);
    });

    const response = await axiosInstance.put(`/products/${productItem.id}`, {
      title: productItem.title,
      price: productItem.price,
      description: productItem.description,
      categoryId: productItem.category.id,
      images: images,
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
