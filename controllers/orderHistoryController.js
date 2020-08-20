const axios = require("axios");

module.exports = {
  getOrderHistory: (req, res) => {
    console.log(req);
    axios
      .get("https://bookstore-709eb.firebaseio.com/orders.json")
      .then((response) => {
        const fetchedData = [];
        for (let key in response.data) {
          // pushing objects into an array
          fetchedData.push({ ...response.data[key], id: key });
        }
        res.json(fetchedData);
      })
      .catch((err) => {
        console.log(err);
        res.err;
      });
  },
  getOrderDetails: (req, res) => {
    console.log(req);
    axios
      .get(
        `https://bookstore-709eb.firebaseio.com/cart.json?orderBy="ordered"&equalTo="true"`
      )
      .then((response) => {
        res.json(response.data);
      })
      .catch((err) => {
        console.log(err);
        res.err;
      });
  },
};
