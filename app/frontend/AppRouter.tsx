import InventoryPage from "./src/pages/inventory/InventoryPage";
import { Navigate, Route, Routes } from "react-router-dom";
import Login from "./src/pages/Login";
import Registration from "./src/pages/Registration";
import SupplierPage from "./src/pages/supplier/SupplierPage";

export default () => {
  return (
    <Routes>
      <Route path="/inventory" element={<InventoryPage />}></Route>
      <Route path="/supplier" element={<SupplierPage />}></Route>
      <Route path="*" element={<Navigate to="/inventory" replace />}></Route>

      <Route path="/login" element={<Login />}></Route>
      <Route path="/registration" element={<Registration />}></Route>
    </Routes>
  );
};
