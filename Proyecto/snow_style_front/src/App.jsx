import { Routes, Route } from "react-router-dom";
import React, { useState, useEffect } from "react";
import Home from "./components/home/Home";
import Registrarse from "./components/pages/Register";
import Explorar from "./components/pages/Explorer";
import Contact from "./components/pages/Contact";
import Car from "./components/pages/Car";
import NavBar from "./components/General/NavBar";
import Footer from "./components/General/Footer";
import Help from "./components/pages/Help";
import WhoAre from "./components/pages/WhoAre";
import DetalleProducto from "./components/pages/DetalleProducto";
import LostP from "./components/pages/LostP";
import Pago from "./components/pages/Pago";
import CardsPrenda from "./components/pages/CardsPrenda";
//import DetallePrenda from "./components/pages/DetallePrenda";
import Spass from "./components/Lpassword/RequestPasswordChange";
import ResetPassword from "./components/Lpassword/ChangePassword";
import Loader from "./components/Load/Loading";

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simula una operación de carga
    setTimeout(() => {
      setLoading(false); // Cuando la carga está completa, cambia loading a false
    }, 3000); // Simula una carga de 3 segundos
  }, []);
  return (
    <div>
      {loading ? (
        <Loader /> // Muestra el componente AudioLoader mientras loading es true
      ) : (
        <div className="App">
          <NavBar />
          <Routes>
            <Route path="/" exact element={<Home />} />
            <Route path="EXPLOR" element={<Explorar />} />
            <Route path="WHO" element={<WhoAre />} />
            <Route path="CAR" element={<Car />} />
            <Route path="CONTACT" element={<Contact />} />
            <Route path="HELP" element={<Help />} />
            <Route path="Lost" element={<LostP />} />
            <Route path="REGIST" element={<Registrarse />} />
            <Route path="WHOARE" element={<WhoAre />} />
            <Route path="DETALLEPRODUCTO" element={<DetalleProducto />} />
            <Route path="PAGO" element={<Pago />} />
            <Route path="perdi" element={<Spass />} />
            <Route
              path="/prendas/:tipoPrendaId/:departamento"
              element={<CardsPrenda />}
            />
            <Route path="/reset/:userId" element={<ResetPassword />} />
            <Route path="/detalle/:id_prenda" element={<DetalleProducto />} />
          </Routes>
          <Footer />
        </div>
      )}
    </div>
  );
}

export default App;
