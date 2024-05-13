import react, { useEffect } from "react";

useEffect((id_prenda) => {
  const fetchTallas = async (id_prenda) => {
    try {
      const tallas = await axios.get(`/api/tallas/tipo/${id_prenda}`);
    } catch (error) {}
  };
});
