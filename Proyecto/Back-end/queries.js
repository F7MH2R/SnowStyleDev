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
		ic.id_itemcarrito as id_itemcarrito,
		t.nom_talla as talla,
		t.id_talla as idTalla
	from 
		usuario u, carrito c  , items_carrito ic , prenda p, talla t 
	where 
		u.id_usuario = c.id_usuario and 
		c.id_carrito = ic.id_carrito and 
		ic.id_prenda = p.id_prenda and
		ic.id_talla = t.id_talla and
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
		id_talla,
		cantidad
	) values (
		$1,
		$2,
		$3,
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

const actualizarEstadoCarrito = `update carrito
	set
		estado_carrito = '${ESTADOS_CARRITO.PAGADO}'
	where 
		id_usuario = $1 and
		estado_carrito = '${ESTADOS_CARRITO.EN_ESPERA}'
	`;

const obtenerDatosPrenda = `SELECT * 
	FROM 
		prenda 
	WHERE 
		id_prenda = $1`;

const descontarInventario = `update tallas_prenda
	set 
		cantidad = (cantidad - $1)
	where
		id_prenda = $2 and
		id_talla = $3
	`;

const obtenerTallasPorPrenda = `select t.id_talla as id_talla, t.nom_talla as talla, t.id_talla as idTalla 
	from 
		prenda p, tallas_prenda tp , talla t 
	where 
		p.id_prenda = tp.id_prenda and
		tp.id_talla = t.id_talla and 
		p.id_prenda = $1 and 
		tp.cantidad > 0 
	`;

const cantidadEnInventario = `SELECT tp.cantidad 
	FROM 
		tallas_prenda tp 
	WHERE 
		tp.id_prenda = $1 and
		tp.id_talla  = $2
	`;

module.exports = {
  queryCarrito: queryCarrito,
  updateCantidadItems: updateCantidadItems,
  deleteItemCarrito: deleteItemCarrito,
  insertarItemsCarrito: insertarItemsCarrito,
  insertarCarrito: insertarCarrito,
  obtenerCarritoPorUsuario: obtenerCarritoPorUsuario,
  actualizarEstadoCarrito: actualizarEstadoCarrito,
  obtenerDatosPrenda: obtenerDatosPrenda,
  descontarInventario: descontarInventario,
  obtenerTallasPorPrenda: obtenerTallasPorPrenda,
  cantidadEnInventario: cantidadEnInventario,
};
