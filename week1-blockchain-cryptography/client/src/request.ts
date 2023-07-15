import axios from "axios";

const request = axios.create({
  baseURL: "http://localhost:3042",
});

export default request;
