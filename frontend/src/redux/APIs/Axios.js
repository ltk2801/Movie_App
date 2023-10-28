import axios from "axios";

const Axios = axios.create({
  baseURL: "https://cinetime.onrender.com/api/v1",
});

export default Axios;
