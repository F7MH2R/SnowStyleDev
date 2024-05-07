import { Routes, Route } from "react-router-dom";
import Home from "./components/home/Home";
import Registrarse from "./components/pages/Register";
import Explorar from "./components/pages/Explorer";
import Car from "./components/pages/Car";
import NavBar from "./components/General/NavBar";  
import Footer from "./components/General/Footer";
import Help from "./components/pages/Help";
import WhoAre from "./components/pages/WhoAre";
import Carrito from "./components/Carrito/Carrito";
import imagen from "./components/Item/blusa.png";
import LostP from "./components/pages/LostP";
import DetalleProducto from "./components/pages/DetalleProducto";

function App() {
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
      <NavBar data={false}  />
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="EXPLOR" element={<Explorar />} />
        <Route path="WHO" element={<WhoAre />} />
        <Route path="CAR" element={<Car />} />

        <Route path="HELP" element={<Help />} />
        <Route path="Lost" element={<LostP />} />
        <Route path="REGIST" element={<Registrarse />} />
        <Route path="WHOARE" element={<WhoAre />} />
        <Route path="cart" element={<Carrito items={items} />} />
        <Route path="DETALLEPRODUCTO" element={<DetalleProducto />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
