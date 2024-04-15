import { useState } from "react";
import "./css/Modal.css";

const Login = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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
              <span className="material-symbols-outlined">
                <EmailIcon />
              </span>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="textbox">
              <span className="material-symbols-outlined">
                <LockIcon />
              </span>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                className="password-toggle"
                type="button"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
              </button>
            </div>
            <button className="signup-button" type="submit">
              <h3>Iniciar Sesión </h3>
              <p></p>
              <span className="material-symbols-outlined"> </span>
            </button>
            <Link to={"/src/components/pages/LostP"} className="lost" href="#">
              Olvidé mi contraseña
            </Link>

            <Link to="/src/components/pages/Register" className="lost">
              No tengo cuenta || Crear cuenta
            </Link>
          </form>
          <p>No necesitas tarjeta de credito</p>
        </div>
      </div>
      <footer className="modal-1-footer">
        <div className="container">
          <article>
            <h2>Listo Para Iniciar.</h2>
            <button className="signup-button" type="button" onClick={openModal}>
              <p>Registrate Gratis</p>
            </button>
          </article>
        </div>
      </footer>
    </section>
  );
};
export default Login;
