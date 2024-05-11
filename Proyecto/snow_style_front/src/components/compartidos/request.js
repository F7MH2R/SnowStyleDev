import axios from "axios";
const url = "http://localhost:3077";

export async function ejecutarGet(sufijo) {
  const urlCompleta = url.concat(sufijo);
  return axios.get(urlCompleta).catch((error) => console.error(error));
}
