import axios from "axios";
const url = "http://localhost:3077";

export async function ejecutarGet(sufijo) {
  const urlCompleta = generarEndpoint(sufijo);
  return axios.get(urlCompleta).catch((error) => console.error(error));
}

export async function ejecutarPatch(sufijo, datos) {
  const endpoint = generarEndpoint(sufijo);
  return axios.patch(endpoint, datos);
}

export async function eliminarItem(sufijo, datos) {
  const endpoint = generarEndpoint(sufijo);
  console.log(endpoint);
  return axios.delete(endpoint, datos);
}

const generarEndpoint = (sufijo) => url.concat(sufijo);
