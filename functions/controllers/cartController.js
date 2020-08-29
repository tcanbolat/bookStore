const axios = require("axios");

module.exports = {
  getAll: (req, res) => {
    axios
      .get(
        JSON.parse(process.env.FIREBASE_CONFIG).databaseURL +
          '/cart.json?orderBy="inCart"&equalTo=true'
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
        res.status(error.response.status).json("Error: " + error.data);
      });
  },
  delete: (req, res) => {
    axios
      .delete(
        JSON.parse(process.env.FIREBASE_CONFIG).databaseURL +
          "/cart/" +
          req.params.id +
          ".json"
      )
      .then(() => {
        res.json();
      })
      .catch((error) => {
        res.status(error.response.status).json("Error: " + error);
      });
  },
  addToCart: (req, res) => {
    req.body["count"] = 1;
    req.body["inCart"] = true;
    axios
      .post(
        JSON.parse(process.env.FIREBASE_CONFIG).databaseURL + "/cart.json",
        req.body
      )
      .then(() => {
        res.json();
      })
      .catch((error) => {
        res.status(error.response.status).json("Error: " + error);
      });
  },
  updateItemCount: (req, res) => {
    axios
      .put(
        JSON.parse(process.env.FIREBASE_CONFIG).databaseURL +
          "/cart/" +
          req.body.id +
          "/count.json",
        JSON.stringify(req.body.count)
      )
      .then(() => {
        res.json();
      })
      .catch((error) => {
        res.status(error.response.status).json("Error: " + error);
      });
  },
};
