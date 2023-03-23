import InventoryPage from "./pages/InventoryPage";
import { Navigate, Route, Routes } from "react-router-dom";

export default () => {
  return (
    <Routes>
      <Route path="/inventory" element={<InventoryPage />}></Route>
      <Route path="*" element={<Navigate to="/inventory" replace />}></Route>
    </Routes>
  );
};
