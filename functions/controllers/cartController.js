const axios = require("axios");

module.exports = {
  getAll: (req, res) => {
    axios
      .get(
        // get call to the REST API database
        JSON.parse(process.env.FIREBASE_CONFIG).databaseURL +
          // returning all items in the cart object that are marked as true.
          '/cart.json?orderBy="inCart"&equalTo=true'
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
        res.status(error.response.status).json("Error: " + error.data);
      });
  },
  delete: (req, res) => {
    axios
      .delete(
        // delete call to the REST API database
        JSON.parse(process.env.FIREBASE_CONFIG).databaseURL +
          // going into the cart url...
          "/cart/" +
          // and deleting the item that matches with the id sent from the client side.
          req.params.id +
          ".json"
      )
      .then((response) => {
        // on success, sending back a 200 response.
        res.json(response.status);
      })
      .catch((error) => {
        // if error send the error status and the data.
        res.status(error.response.status).json("Error: " + error);
      });
  },
  addToCart: (req, res) => {
    // taking the cart item object sent from the client...
    // and adding a count key with a value of one.
    req.body["count"] = 1;
    // and adding a inCart key with a value of true.
    req.body["inCart"] = true;
    axios
      .post(
        //making as post request to the REST API database.
        JSON.parse(process.env.FIREBASE_CONFIG).databaseURL + "/cart.json",
        // adding the item object to the cart node of the REST API.
        req.body
      )
      .then((response) => {
        // on success, sending back a 200 response.
        res.json(response.status);
      })
      .catch((error) => {
        // if error send the error status and the data.
        res.status(error.response.status).json("Error: " + error);
      });
  },
  updateItemCount: (req, res) => {
    axios
      .put(
        // updating a cart items count with a put request to the REST API database.
        JSON.parse(process.env.FIREBASE_CONFIG).databaseURL +
          // reaching into the cart node.
          "/cart/" +
          // this is the id of the item sent from client.
          req.body.id +
          // reaching into the items count key
          "/count.json",
        // and updating the count with the new count sent from clieet side.
        JSON.stringify(req.body.count)
      )
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
