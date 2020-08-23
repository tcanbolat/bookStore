const axios = require("axios");

module.exports = {
  getOrderHistory: (req, res) => {
    axios
      .get("https://bookstore-709eb.firebaseio.com/orders.json")
      .then((response) => {
        const fetchedData = [];
        for (let key in response.data) {
          // pushing objects into an array
          fetchedData.push({ ...response.data[key], id: key });
        }
        res.json(fetchedData.reverse());
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
  deleteOrder: (req, res) => {
    axios
      .all([
        axios.get(
          `https://bookstore-709eb.firebaseio.com/cart.json?orderBy="orderID"&equalTo="` +
            req.params.id +
            `"`
        ),
        axios.get(
          `https://bookstore-709eb.firebaseio.com/orders.json?orderBy="orderId"&equalTo="` +
            req.params.id +
            `"`
        ),
      ])

      .then((responses) => {
        const orderItems = Object.keys(responses[0].data);
        const orderKey = Object.keys(responses[1].data);
        const deleteArray = [];
        for (let i = 0; i < orderItems.length; i++) {
          deleteArray.push(
            axios.delete(
              "https://bookstore-709eb.firebaseio.com/cart/" +
                orderItems[i] +
                ".json"
            )
          );
        }

        axios.all([
          deleteArray,
          axios.delete(
            "https://bookstore-709eb.firebaseio.com/orders/" +
              orderKey +
              ".json"
          ),
        ]);
      })
      .then((response) => {
        res.json(response);
      })
      .catch((err) => {
        console.log(err);
        res.err;
      });
  },
};
