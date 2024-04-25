import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./components/home/Home";
import Login from "./components/pages/Login";
import Registrarse from "./components/pages/Register";
import Explorar from "./components/pages/Explorer";
import Contact from "./components/pages/Contact";
import Car from "./components/pages/Car";
import Nav from "./components/General/NavBar";
import Footer from "./components/General/Footer";
import Help from "./components/pages/Help";
import WhoAre from "./components/pages/WhoAre";
import DetalleProducto from "./components/pages/DetalleProducto";
import Carrito from "./components/Carrito/Carrito";
import imagen from "./components/Item/blusa.png";
import LostP from "./components/pages/LostP";
import MujerDepartamento from "./components/pages/MujerDepartamento";
//import Item from "./components/Item/Item";
// <Route path="LOGIN" element={<Login />} />;


function App() {
  const usuarioSesion = Number(localStorage.getItem("UserId"));
  const items = [
    {
      imagen: imagen,
      descripcion: "Prenda 1",
      precio: 10.25,
      id: 1,
    },
    {
      imagen: imagen,
      descripcion: "Prenda 2",
      precio: 10.25,
      id: 2,
    },
  ];
  return (
    <div className="App">
      <Nav />
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
        <Route path="cart" element={<Carrito items={items} />} />
        <Route path="cart" element={<Carrito items={items} />} />
        <Route path="MUJERDEPARTAMENTO" element={<MujerDepartamento items={items} />} />

      </Routes>
      <Footer />
    </div>
  );
}

export default App;
