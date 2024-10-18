import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export const ProtecRoute = ({ children }: { children: JSX.Element }) => {
  const authCredential = useSelector(
    (state: RootState) => state.auth.authCredential,
  );

  return authCredential ? children : <Navigate to="/" />;
};

export const VerifyAuthenticatedRoute = ({
  children,
}: {
  children: JSX.Element;
}) => {
  const authCredential = useSelector(
    (state: RootState) => state.auth.authCredential,
  );

  return authCredential ? <Navigate to="/products" /> : children;
};
