import { ProductType } from "@/type.ds";
import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

export interface productSliceType {
  productList: ProductType[];
  selectedCategoryId: string;
}
const initialState: productSliceType = {
  productList: [],
  selectedCategoryId: "0",
};

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setProductListReducer: (state, action: PayloadAction<ProductType[]>) => {
      state.productList = action.payload;
    },
    deleteProductReducer: (state, action: PayloadAction<number>) => {
      const productId = action.payload;
      const newProductList = state.productList.filter(
        (item) => item.id !== productId,
      );
      state.productList = [...newProductList];
    },
    updateProductReducer: (state, action: PayloadAction<ProductType>) => {
      const productItem = action.payload;
      const index = state.productList.findIndex(
        (item) => item.id === productItem.id,
      );

      if (index !== -1) {
        state.productList[index] = {
          ...state.productList[index],
          ...productItem,
        };
      }
    },
    createProductReducer: (state, action: PayloadAction<ProductType>) => {
      state.productList = [action.payload, ...state.productList];
    },
    setSelectedCategoryIdReducer: (state, action: PayloadAction<string>) => {
      state.selectedCategoryId = action.payload;
    },
  },
});

export const {
  setProductListReducer,
  createProductReducer,
  deleteProductReducer,
  updateProductReducer,
  setSelectedCategoryIdReducer,
} = productSlice.actions;

export default productSlice.reducer;
