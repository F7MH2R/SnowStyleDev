import React from "react";
import { Routes, Route } from "react-router-dom";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import AdminDashboard from "./components/AdminDashboard/AdminDashboard";

function App() {
  return (
    <div>
      <ToastContainer />
      <Routes>
        <Route path="/" exact element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="admin" element={<AdminDashboard />} />
      </Routes>
    </div>
  );
}

export default App;
