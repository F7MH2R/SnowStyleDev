import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./components/home/Home";
import Login from "./components/pages/Login";
import Registrarse from "./components/pages/Register";
import Explorar from "./components/pages/Explorer";
import Car from "./components/pages/Car";
import Nav from "./components/General/NavBar";
import Footer from "./components/General/Footer";
import Help from "./components/pages/Help";
import WhoAre from "./components/pages/WhoAre";
import LostP from "./components/pages/LostP";
//import Item from "./components/Item/Item";
// <Route path="LOGIN" element={<Login />} />;

import DetalleProducto from "./components/pages/DetalleProducto";

function App() {
  const usuarioSesion = Number(localStorage.getItem("UserId"));
  return (
    <div className="App">
      <Nav />
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="EXPLOR" element={<Explorar />} />
        <Route path="WHO" element={<WhoAre />} />
        <Route path="CAR" element={<Car />} />

        <Route path="HELP" element={<Help />} />
        <Route path="Lost" element={<LostP />} />
        <Route path="REGIST" element={<Registrarse />} />
        <Route path="WHOARE" element={<WhoAre />} />
        <Route path="DETALLEPRODUCTO" element={<DetalleProducto />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
