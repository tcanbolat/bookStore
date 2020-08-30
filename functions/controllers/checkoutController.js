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
      // .all call that takes in multiple axios calls and waits for them to all finish.
      .all([
        // making a call for each item that was checked out to the REST API database and updating their values.
        axios.patch(
          JSON.parse(process.env.FIREBASE_CONFIG).databaseURL + "/cart.json",
          batch
        ),
        // making a call to the orders node of the REST API database and saving the order info.
        axios.post(
          JSON.parse(process.env.FIREBASE_CONFIG).databaseURL + "/orders.json",
          {
            shipping: shippingInfo,
            total: orderTotal,
            orderId: email + "-" + time,
            orderTime: time,
          }
        ),
      ])
      .then((response) => {
        // on success, sending back a 200 response.
        res.json(response.data);
      })
      .catch((error) => {
        // if error send the error status and the data.
        res.status(error.response.status).json("Error: " + error);
      });
  },
};
