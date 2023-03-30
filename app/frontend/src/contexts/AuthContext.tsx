import { createContext, ReactNode, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { signInRequest, signUpRequest } from "../services/authService";

interface IAuthContextProps {
  isAuthenticated: boolean;
  signIn: (username: string, password: string) => Promise<void>;
  signUp: (username: string, password: string) => Promise<void>;
}

export const AuthContext = createContext({} as IAuthContextProps);

export default ({ children }: { children: ReactNode }) => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const session = localStorage.getItem("inventory.control.token");

    if (location.pathname !== "/registration" && !session) {
      navigate("/login");
    }
  }, []);

  async function signIn(username: string, password: string) {
    const data = await signInRequest(username, password);

    if (data.status) {
      return;
    }

    localStorage.setItem("inventory.control.token", data.token);

    navigate("/");
  }

  async function signUp(username: string, password: string) {
    const data = await signUpRequest(username, password);

    if (data.status) {
      return;
    }

    await signIn(data.username, password);
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated: true, signIn, signUp }}>
      {children}
    </AuthContext.Provider>
  );
};
