import { TokensType, UserType } from "@/services/auth";
import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

export interface authSliceType {
  tokens: TokensType | null;
  authCredential: UserType | null;
}
const initialState: authSliceType = {
  tokens:
    window.localStorage.getItem("tokens") !== null ||
    window.localStorage.getItem("tokens") !== undefined
      ? JSON.parse(window.localStorage.getItem("tokens")!)
      : null,
  authCredential: null,
};

export const categorySlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setTokensReducer: (state, action: PayloadAction<TokensType>) => {
      window.localStorage.setItem("tokens", JSON.stringify(action.payload));
      state.tokens = action.payload;
    },
    setAuthReducer: (state, action: PayloadAction<UserType>) => {
      state.authCredential = action.payload;
    },
    setResetCredentialReducer: (state) => {
      state.authCredential = null;
      state.tokens = null;
      window.localStorage.removeItem("tokens");
    },
  },
});

export const { setTokensReducer, setAuthReducer, setResetCredentialReducer } =
  categorySlice.actions;

export default categorySlice.reducer;
