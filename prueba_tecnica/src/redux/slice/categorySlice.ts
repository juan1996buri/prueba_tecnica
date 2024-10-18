import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { CategoryType } from "./../../type.ds";

export interface categorySliceType {
  calegoryList: CategoryType[];
}
const initialState: categorySliceType = {
  calegoryList: [],
};

export const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    setCategoryListReducer: (state, action: PayloadAction<CategoryType[]>) => {
      state.calegoryList = action.payload;
    },
    deleteCategoryReducer: (state, action: PayloadAction<number>) => {
      const categoryId = action.payload;
      const newCategoryList = state.calegoryList.filter(
        (item) => item.id !== categoryId,
      );
      state.calegoryList = [...newCategoryList];
    },
    updateCategoryReducer: (state, action: PayloadAction<CategoryType>) => {
      const productItem = action.payload;
      const index = state.calegoryList.findIndex(
        (item) => item.id === productItem.id,
      );
      if (index !== -1) {
        state.calegoryList[index] = {
          ...state.calegoryList[index],
          ...productItem,
        };
      }
    },
    createCategoryReducer: (state, action: PayloadAction<CategoryType>) => {
      state.calegoryList = [action.payload, ...state.calegoryList];
    },
  },
});

export const {
  setCategoryListReducer,
  createCategoryReducer,
  deleteCategoryReducer,
  updateCategoryReducer,
} = categorySlice.actions;

export default categorySlice.reducer;
