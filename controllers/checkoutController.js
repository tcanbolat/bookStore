const axios = require("axios");

module.exports = {
  checkoutCart: (req, res) => {
    // console.log(req.body.shippingInfo);
    // console.log(req.body.total);

    const ids = req.body.id;

    for (let i = 0; i < ids.length; i++) {
      ids[i] = ids[i] + "/inCart";
    }

    const keys = ids.reduce((a, b) => ((a[b] = "false"), a), {});

    axios
      .patch("https://bookstore-709eb.firebaseio.com/cart.json", keys)
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
        res.err;
      });
  },
};
