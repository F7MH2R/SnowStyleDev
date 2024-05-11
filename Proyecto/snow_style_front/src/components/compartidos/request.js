import axios from "axios";
const url = "http://localhost:3077";

export function ejecutarGet(sufijo) {
  const urlCompleta = url.concat(sufijo);
  console.log("url completa: ", urlCompleta);
  axios
    .get(urlCompleta)
    .then((res) => {
      console.log("response: ", res);
      return res.data;
    })
    .catch((error) => console.error(error));
}
