const axios = require("axios");

module.exports = {
  getByOrderId: (req, res) => {
    const id = req.query.orderId;
    axios
      .get(
        JSON.parse(process.env.FIREBASE_CONFIG).databaseURL +
          `/cart.json?orderBy="orderID"&equalTo="` +
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
      .catch((error) => {
        res.status(error.response.status).json("Error: " + error);
      });
  },
};
