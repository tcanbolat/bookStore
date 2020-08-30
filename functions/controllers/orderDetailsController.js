const axios = require("axios");

module.exports = {
  getByOrderId: (req, res) => {
    const id = req.query.orderId;
    axios
      .get(
        // call to the REST API database
        JSON.parse(process.env.FIREBASE_CONFIG).databaseURL +
          // reaching into the cart node...
          `/cart.json?orderBy="orderID"&equalTo="` +
          // and returning any items that match with the orderID requested from client side.
          id +
          `"`
      )
      .then((response) => {
        // array needed to capture response.
        const fetchedData = [];
        for (let key in response.data) {
          // pushing objects into the fetchedData array with the key renamed as the id of the object.
          fetchedData.push({ ...response.data[key], id: key });
        }
        // sending the fetchedData array back to the client side.
        res.json(fetchedData);
      })
      .catch((error) => {
        // if error send the error status and the data.
        res.status(error.response.status).json("Error: " + error);
      });
  },
};
