import axios from "axios";
const url = "http://localhost:3077";

export async function ejecutarGet(sufijo) {
  const urlCompleta = url.concat(sufijo);
  return axios.get(urlCompleta).catch((error) => console.error(error));
}

export async function ejecutarPatch(sufijo, datos) {
  const endpoint = url.concat(sufijo);
  return axios.patch(endpoint, datos);
}
