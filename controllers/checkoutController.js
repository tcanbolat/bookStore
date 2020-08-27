const axios = require("axios");

module.exports = {
  checkoutCart: (req, res) => {
    const shippingInfo = req.body.shippingInfo;
    const orderTotal = req.body.total;
    const email = req.body.shippingInfo.email;
    const time = new Date().getTime();
    const inCart = [];
    const ordered = [];
    const orderID = [];
    // taking the id's of each item id sent by the client.
    // and adding a inCart string to the end of all of them.
    // result - [id/inCart, id/inCart] - for however many number if id's.
    for (let i = 0; i < req.body.id.length; i++) {
      inCart.push(req.body.id[i] + "/inCart");
      ordered.push(req.body.id[i] + "/ordered");
      orderID.push(req.body.id[i] + "/orderID");
    }
    // taking all the uniqueIdid/inCart in the ids array and giving them all a value of false.
    const cartUpdate = inCart.reduce((a, b) => ((a[b] = "false"), a), {});
    const orderedUpdate = ordered.reduce((a, b) => ((a[b] = "true"), a), {});
    const setOrderID = orderID.reduce(
      (a, b) => ((a[b] = email + "-" + time), a),
      {}
    );
    const batch = { ...cartUpdate, ...orderedUpdate, ...setOrderID };
    // the batch variable will look like this...
    //    {
    //   "uniqueId1/inCart": "false",
    //   "uniqueId1/ordered": "true",
    //   "uniqueId1/orderID": "id",
    //   "uniqueId2/inCart": "false",
    //   "uniqueId2/ordered": "true",
    //   "uniqueId2/orderID": "id",
    //   }
    // the "uniqueId/inCart : /ordered" becomes the url for each uniqueId and updates them all to true or false.
    // grouping them all in an object will update values at multiple paths with one axios call.
    axios
      .all([
        axios.patch("https://bookstore-709eb.firebaseio.com/cart.json", batch),
        axios.post("https://bookstore-709eb.firebaseio.com/orders.json", {
          shipping: shippingInfo,
          total: orderTotal,
          orderId: email + "-" + time,
          orderTime: time
        }),
      ])
      .then((response) => {
        res.json(response.data);
      })
      .catch((error) => {
        res.status(error.response.status).json("Error: " + error);
      });
  },
};
