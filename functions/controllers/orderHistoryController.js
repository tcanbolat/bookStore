const axios = require("axios");

module.exports = {
  getOrderHistory: (req, res) => {
    axios
      // get request to the REST API databse, pointing to the orders node.
      .get(JSON.parse(process.env.FIREBASE_CONFIG).databaseURL + "/orders.json")
      .then((response) => {
        // array needed to capture response.
        const fetchedData = [];
        for (let key in response.data) {
          // pushing objects into the fetchedData array with the key renamed as the id of the object.
          fetchedData.push({ ...response.data[key], id: key });
        }
        // sending the fetchedData array back to the client side.
        res.json(fetchedData.reverse());
      })
      .catch((error) => {
        // if error send the error status and the data.
        res.status(error.response.status).json("Error: " + error);
      });
  },
  deleteOrder: (req, res) => {
    axios
      // .all method that takes in multiple axios requests and waits for them all to finish.
      .all([
        axios.get(
          // get request to the REST API database pointing to the cart node.
          JSON.parse(process.env.FIREBASE_CONFIG).databaseURL +
            // returning all items that match with the orderID sent from client.
            `/cart.json?orderBy="orderID"&equalTo="` +
            req.params.id +
            `"`
        ),
        axios.get(
          // get request to the REST API database pointing to the orders node.
          JSON.parse(process.env.FIREBASE_CONFIG).databaseURL +
            // returing the order object that matches the request from the client side.
            `/orders.json?orderBy="orderId"&equalTo="` +
            req.params.id +
            `"`
        ),
      ])
      .then((responses) => {
        // responses come back in an array.
        // orderItems and orderKey pulls the ids needed from each object in the array.
        const orderItems = Object.keys(responses[0].data);
        const orderKey = Object.keys(responses[1].data);
        const deleteArray = [];
        // for however many item id's are in orderItems...
        for (let i = 0; i < orderItems.length; i++) {
          deleteArray.push(
            // create an axios call to delete that item and push it into the deleteArray.
            axios.delete(
              JSON.parse(process.env.FIREBASE_CONFIG).databaseURL +
                "/cart/" +
                orderItems[i] +
                ".json"
            )
          );
        }

        axios.all([
          // .all method that takes in all the delete call created in the for loop...
          deleteArray,
          // and one more delete call to delete the order object as well.
          axios.delete(
            JSON.parse(process.env.FIREBASE_CONFIG).databaseURL +
              "/orders/" +
              orderKey +
              ".json"
          ),
        ]);
      })
      .then((response) => {
        // on success, sending back a 200 response.
        res.json(response.status);
      })
      .catch((error) => {
        // if error send the error status and the data.
        res.status(error.response.status).json("Error: " + error);
      });
  },
};
