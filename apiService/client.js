import axios from "axios";

export default axios.create({
  //baseURL: "https://jsonplaceholder.typicode.com",
  //baseURL: "https://clads-service.herokuapp.com/api/v1",
  baseURL: "https://darot-image-upload-service.herokuapp.com",
});
