import { useState } from "react";
import "./css/Modal.css"

const Login = () => {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  const handleSubmit = (event) => {
    // Aquí puedes manejar la lógica para enviar el formulario
    event.preventDefault();
    // Por ahora, solo cerramos el modal al enviar el formulario
    closeModal();
  };

  return (
    <section className="page modal-1-page">
      <div
        className={`modal-1-overlay ${isOpen ? "open" : ""}`}
        onClick={closeModal}
      >
        <div className="modal-1-modal" onClick={(e) => e.stopPropagation()}>
          <header>
            <h2>Sign Up</h2>
            <h3>SnowStyle</h3>
          </header>
          <form onSubmit={handleSubmit}>
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
            >
              <h3>Iniciar Sesión </h3> 
              <p></p>
              <span className="material-symbols-outlined"> </span>
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
              onClick={openModal}
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
