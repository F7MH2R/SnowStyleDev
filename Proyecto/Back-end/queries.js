const ESTADOS_CARRITO = {
  EN_ESPERA: "En espera",
  PAGADO: "Pagado",
};

const queryCarrito = `select 
	p.nombre_prenda as descripcion,
	p.precio_unitario as precio,
	p.imagen1 as imagen,
	ic.cantidad as cantidad,
	p.id_prenda as id,
	ic.id_itemcarrito as id_itemcarrito
from usuario u, carrito c  , items_carrito ic , prenda p 
where 
u.id_usuario = c.id_usuario and 
c.id_carrito = ic.id_carrito and 
ic.id_prenda = p.id_prenda and
u.id_usuario = $1 and
estado_carrito = '${ESTADOS_CARRITO.EN_ESPERA}'
order by ic.id_itemcarrito`;

const updateCantidadItems = `update items_carrito 
	set
		cantidad = $1
	where
		id_itemcarrito = $2`;

const deleteItemCarrito = `delete from items_carrito
where
	id_itemcarrito = $1`;

const insertarItemsCarrito = `insert into items_carrito (
		id_carrito,
		id_prenda,
		cantidad
	) values (
		$1,
		$2,
		1
	)`;

const insertarCarrito = `insert into carrito (
		id_usuario,
		id_prenda,
		estado_carrito
	) values (
		$1,
		$2,
		'${ESTADOS_CARRITO.EN_ESPERA}'
	)`;

const obtenerCarritoPorUsuario = `select id_carrito as id from carrito
	where 
		id_usuario = $1 and 
		estado_carrito = '${ESTADOS_CARRITO.EN_ESPERA}'
	`;

module.exports = {
  queryCarrito: queryCarrito,
  updateCantidadItems: updateCantidadItems,
  deleteItemCarrito: deleteItemCarrito,
  insertarItemsCarrito: insertarItemsCarrito,
  insertarCarrito: insertarCarrito,
  obtenerCarritoPorUsuario: obtenerCarritoPorUsuario,
};