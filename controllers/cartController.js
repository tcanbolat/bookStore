const axios = require("axios");

module.exports = {
  getAll: (req, res) => {
    axios
      .get(
        'https://bookstore-709eb.firebaseio.com/cart.json?orderBy="inCart"&equalTo=true'
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
        res.status(400).json('Error: ' + error);
      });
  },
  delete: (req, res) => {
    axios
      .delete(
        "https://bookstore-709eb.firebaseio.com/cart/" + req.params.id + ".json"
      )
      .then(() => {
        res.json();
      })
      .catch((error) => {
        res.status(400).json('Error: ' + error)
      });
  },
  addToCart: (req, res) => {
    req.body["count"] = 1;
    req.body["inCart"] = true;
    axios
      .post("https://bookstore-709eb.firebaseio.com/cart.json", req.body)
      .then(() => {
        res.json();
      })
      .catch((error) => {
        res.status(400).json('Error: ' + error)
      });
  },
  updateItemCount: (req, res) => {
    axios
      .put(
        "https://bookstore-709eb.firebaseio.com/cart/" +
          req.body.id +
          "/count.json",
        JSON.stringify(req.body.count)
      )
      .then(() => {
        res.json();
      })
      .catch((error) => {
        res.status(400).json('Error: ' + error)
      });
  },
};
