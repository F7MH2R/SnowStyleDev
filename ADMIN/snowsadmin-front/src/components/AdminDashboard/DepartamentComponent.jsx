import React from "react";
import "./admin.css"; // Importa tu archivo CSS aquí


function DepartmentComponent() {
  return (
    <div className="department-container">
      <div className="department-card">
        <h3>Mujeres</h3>
        <img
          className="department-image"
          src="https://media.istockphoto.com/id/1369508766/es/foto/hermosa-mujer-latina-exitosa-sonriendo.jpg?s=612x612&w=0&k=20&c=f-3MdwiVjpE4UWQdqLC3vpWViYMCiGUPr5aKLCmTnDI="
          alt="Mujeres"
        />
        <div className="department-actions">
          <button>Administrar Departamento</button>
        </div>
      </div>
      <div className="department-card">
        <h3>Hombres</h3>
        <img
          className="department-image"
          src="https://media.istockphoto.com/id/1388644810/es/foto/joven-cauc%C3%A1sico-feliz-que-usa-el-tel%C3%A9fono-celular-inteligente-para-llamadas-redes-sociales.jpg?s=612x612&w=0&k=20&c=y0DxAEy2moHjEj3Uh4AzdjgKjVoZaQrWAhhyu4CwoRQ="
          alt="Hombres"
        />
        <div className="department-actions">
          <button>Administrar Departamento</button>
        </div>
      </div>
      <div className="department-card">
        <h3>Niños</h3>
        <img
          className="department-image"
          src="https://previews.123rf.com/images/romrodinka/romrodinka1601/romrodinka160100295/51677131-dos-hermanos-peque%C3%B1os-muchachos-del-ni%C3%B1o-en-ropa-de-colores-de-invierno-hacer-el-%C3%A1ngel-de-la-nieve.jpg"
          alt="Niños"
        />
        <div className="department-actions">
          <button>Administrar Departamento</button>
        </div>
      </div>
    </div>
  );
}

export default DepartmentComponent;
