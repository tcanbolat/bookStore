import axios from "axios";

let cancel;
const CancelToken = axios.CancelToken;

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
  updateItemCount: (update) => {
    if (cancel !== undefined) {
      cancel({
        message: "subsequent request canclled",
      });
    }
    return axios.put("/api/cart", update, {
      cancelToken: new CancelToken(function executor(c) {
        cancel = c;
      }),
    });
  },
};
