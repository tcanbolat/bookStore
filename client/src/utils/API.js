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
  addToCart: (book) => {
    return axios.post("/api/cart", book);
  },
  updateItemCount: (update) => {
    // cancel token to cancel subsequent requests, coming from "/api/cart"
    // the setTimout(); in Cart.js already catches all them, but this is here to use as well.
    let cancel;
    const CancelToken = axios.CancelToken;
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
  checkoutCart: (checkout) => {
    return axios.patch("api/checkout", checkout);
  },
  getOrders: () => {
    return axios.get("api/orderhistory");
  },
};
