import { Routes, Route } from "react-router-dom";
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

function App() {
  return (
    <div className="App">
      <NavBar data={false} />
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
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
