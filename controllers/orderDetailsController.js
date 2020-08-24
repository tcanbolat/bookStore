const axios = require("axios");

module.exports = {
  getByOrderId: (req, res) => {
    const id = req.query.orderId;
    axios
      .get(
        `https://bookstore-709eb.firebaseio.com/cart.json?orderBy="orderID"&equalTo="` +
          id +
          `"`
      )
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
};
