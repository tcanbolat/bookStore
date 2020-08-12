const axios = require("axios");

module.exports = {
  getAll: (req, res) => {
    axios
      .get("https://bookstore-709eb.firebaseio.com/cart.json")
      .then((response) => {
        const fetchedData = [];
        for (let key in response.data) {
          // pushing objects into an array
          fetchedData.push({ ...response.data[key], id: key });
        }
        res.json(fetchedData);
      })
      .catch((err) => {
        res.json(err);
        console.log(err);
      });
  },
  delete: (req, res) => {
    console.log(req.params.id);
    axios
      .delete(
        "https://bookstore-709eb.firebaseio.com/cart/" + req.params.id + ".json",{
            headers: {
              type: "application/json",
            }
          }
      )
      .then(() => {
        res.json();
      })
      .catch((err) => {
        res.json(err);
        console.log(err);
      });
  },
  addToCart: (req, res) => {
    console.log(req.body);
    axios
      .post("https://bookstore-709eb.firebaseio.com/cart.json/", req.body)
      .then(() => {
        res.json();
      })
      .catch((err) => {
        res.json(err);
        console.log(err);
      });
  },
};
