import React from "react";
import googleFontsURL from "../FuenteLetra/FuenteLetra";
import "./admin.css";

function DepartmentComponent() {
  return (
    <div
      style={{ fontFamily: "Prompt, sans-serif" }}
      className="department-container"
    >
      <link rel="stylesheet" href={googleFontsURL} />
      <div className="department-card">
        <h3>Mujeres</h3>
        <img
          className="department-image"
          src="https://i.ibb.co/r0HQNnv/mujer-invierno.jpg"
          alt="Mujeres"
        />
      </div>
      <div className="department-card">
        <h3>Hombres</h3>
        <img
          className="department-image"
          src="https://i.ibb.co/7S16cSY/hombre-invierno.jpg"
          alt="Hombres"
        />
      </div>
      <div className="department-card">
        <h3>Niños</h3>
        <img
          className="department-image"
          src="https://i.ibb.co/17S8jpm/ni-os-invierno.jpg"
          alt="Niños"
        />
      </div>
    </div>
  );
}

export default DepartmentComponent;
