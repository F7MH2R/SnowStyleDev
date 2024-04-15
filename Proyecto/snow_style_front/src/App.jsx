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
import Whoare from "./components/pages/WhoAre";




function App() {
  const usuarioSesion = Number(localStorage.getItem("UserId"));
  return (
    <div className="App">
      <Nav/>      
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="EXPLOR" element={<Explorar />} />
        <Route path="CAR" element={<Car />} />
        <Route path="CONTACT" element={<Contact />} />
        <Route path="HELP" element={<Help />} />
        <Route path="LOGIN" element={<Login />} />
        <Route path="REGIST" element={<Registrarse />} />
        <Route path="WHOARE" element={<Whoare />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;