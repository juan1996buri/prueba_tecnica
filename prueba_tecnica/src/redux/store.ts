import { configureStore } from "@reduxjs/toolkit";
import authReduce from "./slice/authSlice";
import categoryReduce from "./slice/categorySlice";
import productReduce from "./slice/productSlice";
export const store = configureStore({
  reducer: {
    product: productReduce,
    category: categoryReduce,
    auth: authReduce,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
