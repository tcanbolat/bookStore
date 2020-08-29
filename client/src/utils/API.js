import axios from "./axios-instance";

export default {
  searchForBooks: (q) => {
    return axios.get("/api/bookquery", { params: { q: "title:" + q } });
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
    return axios.put("/api/cart", update);
  },
  checkoutCart: (checkout) => {
    return axios.patch("/api/checkout", checkout);
  },
  getOrders: () => {
    return axios.get("/api/orderhistory");
  },
  deleteOrder: (id) => {
    return axios.delete("/api/orderhistory/" + id);
  },
  getByOrderId: (orderId) => {
    return axios.get("/api/orderdetails", { params: { orderId } });
  },
};
