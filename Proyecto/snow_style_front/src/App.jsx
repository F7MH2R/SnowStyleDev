import "./App.css";
import { Routes, Route } from "react-router-dom";

import Home from "./components/home/Home";
import LOGIN from "./components/pages/Login";
import Register from "./components/pages/Register";
import Explorar from "./components/pages/Explorer";

//Notificaciones

function App() {
  const usuarioSesion = Number(localStorage.getItem("UserId"));
  return (
    <div className="App">
      <Navbarra data={usuarioSesion > 0 ? true : false} />
      <Routes>
        <Route path="/" exact element={<Home />} />

        <Route path="notif" element={<Notificaciones />} />
        <Route path="edit" element={<EditarPropiedad />} />
        <Route path="explore" element={<Explorar />} />
        <Route path="Ayuda" element={<Ayuda />} />
        <Route path="login" element={<Login />} />
        <Route path="explore" element={<Explorar />} />
        <Route path="ContactDatos" element={<Contacto />} />
        <Route path="register" element={<Signup />} />
        <Route path="publish" element={<PublicarPropiedad />} />
        <Route path="quienes" element={<QuienesSomos />} />
        <Route path="lostpassword" element={<Lost />} />

        <Route path="contactar" element={<Contacto />} />
        <Route path="verprop" element={<VistaPropiedad />} />
        <Route path="agendar" element={<Agenda />} />
        <Route path="properties" element={<EditarPerfil />} />
      </Routes>
      <CustomFooter />
    </div>
  );
}

export default App;