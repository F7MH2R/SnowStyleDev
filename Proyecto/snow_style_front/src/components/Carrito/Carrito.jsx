import react from "react";
import Item from "../Item/Item";

const Carrito = ({ items }) => {
  let total = 0.0;
  return (
    <div
      class="offcanvas offcanvas-end show"
      tabindex="-1"
      id="offcanvasNavbar"
    >
      <div class="offcanvas-header">
        <h5 class="offcanvas-title" id="offcanvasNavbarLabel">
          Canasta de compra
        </h5>
        <button
          type="button"
          class="btn-close"
          data-bs-dismiss="offcanvas"
          aria-label="Close"
        ></button>
      </div>
      <div className="offcanvas-body">
        {items ? (
          items.map((item) => {
            total += item.precio;
            return (
              <Item
                imagen={item.imagen}
                descripcion={item.descripcion}
                precio={item.precio}
                id={item.id}
              />
            );
          })
        ) : (
          <p>No tienes productos en tu carrito</p>
        )}
        <div className="row">
          <dir className="col">Total: $ {total}</dir>
        </div>
        <div className="row">
          <button href="#" className="btn btn-primary">
            Pagar
          </button>
        </div>
      </div>
    </div>
  );
};

export default Carrito;
