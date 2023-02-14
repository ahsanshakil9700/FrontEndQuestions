import axios from "axios";

export const fetchQuestion = (requestBody) => {

  return axios.post("http://localhost:3003/questions", requestBody);
};