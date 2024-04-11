import { useState } from "react";
import "./css/Modal.css"
//import logo from "./logo.svg";

 const Login = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleModal = () => setIsOpen(!isOpen);

  return (
    <section className="page modal-1-page">
      <div
        className={`modal-1-overlay ${isOpen ? "open" : ""}`}
        onClick={toggleModal}
      >
        <div className="modal-1-modal">
          <header>
            <h2>Sign Up</h2>
            <h3>SnowStyle</h3>
          </header>
          <form>
            <div className="textbox">
              <span class="material-symbols-outlined"></span>
              <input type="email" placeholder="Email" />
            </div>
            <div className="textbox">
              <span class="material-symbols-outlined"></span>
              <input type="password" placeholder="Password" />
            </div>
            <button
              className="signup-button"
              type="submit"
              onClick={toggleModal}
            >
              <p></p>
              <span className="material-symbols-outlined"> Inicar Sesión </span>
            </button>
          </form>
          <p>No necesitas tarjeta de credito</p>
        </div>
      </div>
      <footer className="modal-1-footer">
        <div className="container">
          <article>
            <h2>Listo Para Iniciar.</h2>
            <button
              className="signup-button"
              type="button"
              onClick={toggleModal}
            >
              <p>Registrate Gratis</p>
              <span className="material-symbols-outlined"> </span>
            </button>
          </article>
          
        </div>
      </footer>
    </section>
  );
};
export default Login;