import axios from "axios";

export default {
  searchForBooks: (q) => {
    return axios.get("/api/google", { params: { q: "title:" + q } });
  },
  getCart: () => {
    return axios.get("/api/cart");
  },
  deleteBook: (id) => {
    return axios.delete("/api/cart/" + id);
  },
  addToCart: function (book) {
    return axios.post("/api/cart", book);
  },
};
