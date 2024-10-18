import { Toaster } from "@/components/ui/toaster";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes, useNavigate } from "react-router-dom";
import "./App.css";
import globalRouter from "./globalRouter";
import AdminLayout from "./Layouts/admin";
import CategoriesPage from "./page/Categories";
import Error404 from "./page/Error404";
import LoginPage from "./page/Login";
import ProductsPage from "./page/Products";
import {
  ProtecRoute,
  VerifyAuthenticatedRoute,
} from "./page/route/ProtecteRoute";
import UsersPage from "./page/Users";
import {
  setAuthReducer,
  setResetCredentialReducer,
} from "./redux/slice/authSlice";
import { RootState } from "./redux/store";
import { getUserWithSession } from "./services/auth";
function App() {
  const navigate = useNavigate();
  globalRouter.navigate = navigate;
  const tokens = useSelector((state: RootState) => state.auth.tokens);

  const dispath = useDispatch();

  useEffect(() => {
    (async () => {
      if (tokens) {
        try {
          const response = await getUserWithSession();
          dispath(setAuthReducer(response));
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (_) {
          dispath(setResetCredentialReducer());
        }
      }
    })();
  }, [dispath, tokens]);
  return (
    <div>
      <Routes>
        <Route
          path="/"
          element={<VerifyAuthenticatedRoute children={<LoginPage />} />}
        />
        <Route path="*" element={<Error404 />} />
        <Route element={<ProtecRoute children={<AdminLayout />} />}>
          <Route
            path="/users"
            element={<ProtecRoute children={<UsersPage />} />}
          />
          <Route
            path="/categories"
            element={<ProtecRoute children={<CategoriesPage />} />}
          />
          <Route
            path="/products"
            element={<ProtecRoute children={<ProductsPage />} />}
          />
        </Route>
      </Routes>
      <Toaster />
    </div>
  );
}

export default App;
