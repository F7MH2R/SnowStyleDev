// App.jsx
import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import NavBar from "./components/General/NavBar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Register from "./components/Register/Register";
import AdminDashboard from "./components/AdminDashboard/AdminDashboard";
import FormPrenda from "./components/Prendas/Create/PrendaForm";
import TablePrenda from "./components/Prendas/Table/PrendaTable";
import TablaProveedor from "./components/Proveedores/Table/ProveedorTable";
import FormProveedor from "./components/Proveedores/Create/ProveedorForm ";
import TallasForm from "./components/Prendas/AddTalla/TallasForm";
import Loader from "./components/Load/Loading";
import { AuthProvider } from "./components/General/AuthContext";
import DepartamentoTable from "./components/Departamento/Table/DepartamentoTable";
import Statistics from "./components/Estadistic/Statistics";
import MarcaTable from "./components/Marca/Table/MarcaTable";
import FormMarca from "./components/Marca/Form/MarcaForm";
import UpdatePrenda from "./components/Prendas/UpdateP/UpdateP";
import TallaTable from "./components/Tallas/TallaTable";

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simula una operación de carga
    setTimeout(() => {
      setLoading(false); // Cuando la carga está completa, cambia loading a false
    }, 1000); // Simula una carga de 3 segundos
  }, []);

  return (
    <AuthProvider>
      <div>
        {loading ? (
          <Loader /> // Muestra el componente Loader mientras loading es true
        ) : (
          <div className="App">
            <NavBar />
            <ToastContainer />
            <Routes>
              <Route path="/" exact element={<Register />} />
              <Route path="register" element={<Register />} />
              <Route path="tallas" element={<TallaTable />} />
              <Route path="/marcaTable" element={<MarcaTable />} />
              <Route path="estadisticas" element={<Statistics />} />
              <Route path="tableproveedor" element={<TablaProveedor />} />
              <Route path="tablePrenda" element={<TablePrenda />} />
              <Route path="FormProveedor" element={<FormProveedor />} />
              <Route path="depaTable" element={<DepartamentoTable />} />
              <Route path="tallas/:id_prenda" element={<TallasForm />} />
              <Route path="admin" element={<AdminDashboard />} />
              <Route path="/FormPrenda" exact element={<FormPrenda />} />
              <Route path="formMarca" exact element={<FormMarca />} />
              <Route path="/UpdatePrenda/:id" element={<UpdatePrenda />} />
            </Routes>
          </div>
        )}
      </div>
    </AuthProvider>
  );
}

export default App;
