import React from "react";
import { Routes, Route } from "react-router-dom";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import AdminDashboard from "./components/AdminDashboard/AdminDashboard";
import FormPrenda from "./components/Prendas/Create/PrendaForm";
import TablePrenda from "./components/Prendas/Table/PrendaTable";
import TablaProveedor from "./components/Proveedores/Table/ProveedorTable";
import FormProveedor from "./components/Proveedores/Create/ProveedorForm ";
import TallasForm from "./components/Prendas/AddTalla/TallasForm";
function App() {
  return (
    <div>
      <ToastContainer />
      <Routes>
        <Route path="/" exact element={<FormPrenda />} />
        <Route path="register" element={<Register />} />
        <Route path="admin" element={<AdminDashboard />} />
        <Route path="/tallas/:prendaId" element={<TallasForm />} />
      </Routes>
    </div>
  );
}

export default App;
