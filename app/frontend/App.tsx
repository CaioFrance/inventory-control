import AppRouter from "./AppRouter";
import { BrowserRouter } from "react-router-dom";
import Layout from "./src/layout/Layout";

export default function () {
  return (
    <BrowserRouter>
      <Layout>
        <AppRouter />
      </Layout>
    </BrowserRouter>
  );
}
