import AppRouter from "./AppRouter";
import { BrowserRouter } from "react-router-dom";
import AuthContext from "./src/contexts/AuthContext";

export default function () {
  return (
    <BrowserRouter>
      <AuthContext>
        <AppRouter />
      </AuthContext>
    </BrowserRouter>
  );
}
