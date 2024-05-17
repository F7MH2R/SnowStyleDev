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
u.id_usuario = $1
order by ic.id_itemcarrito`;

const updateCantidadItems = `update items_carrito 
	set
		cantidad = $1
	where
		id_itemcarrito = $2`;

const deleteItemCarrito = `delete from items_carrito
where
	id_itemcarrito = $1`;

module.exports = {
  queryCarrito: queryCarrito,
  updateCantidadItems: updateCantidadItems,
  deleteItemCarrito: deleteItemCarrito,
};
