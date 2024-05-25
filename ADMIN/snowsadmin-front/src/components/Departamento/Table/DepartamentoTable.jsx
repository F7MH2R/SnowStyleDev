// src/components/DepartamentoTable.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import googleFontsURL from "../../FuenteLetra/FuenteLetra";
import DepartmentComponent from "../../AdminDashboard/DepartamentComponent";
import "../Table/DepartamentoTable.css";

const DepartamentoTable = () => {
  const [departamentos, setDepartamentos] = useState([]);

  useEffect(() => {
    fetchDepartamentos();
  }, []);

  const fetchDepartamentos = async () => {
    const result = await axios.get("http://localhost:3076/departamentos");
    setDepartamentos(result.data);
  };

  return (
    <div className="admin-section">
      <h5>Departamentos</h5>
      <DepartmentComponent />
    </div>
  );
};

export default DepartamentoTable;
