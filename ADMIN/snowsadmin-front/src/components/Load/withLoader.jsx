import React, { useState, useEffect } from "react";
import Loader from "./Loading";

const withLoader = (WrappedComponent) => {
  return (props) => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      // Simula una operación de carga
      const timer = setTimeout(() => {
        setLoading(false); // Cuando la carga está completa, cambia loading a false
      }, 1000); // Simula una carga de 3 segundos

      return () => clearTimeout(timer); // Limpia el temporizador al desmontar el componente
    }, []);

    return (
      <div>
        {loading ? (
          <Loader /> // Muestra el componente Loader mientras loading es true
        ) : (
          <WrappedComponent {...props} />
        )}
      </div>
    );
  };
};

export default withLoader;
