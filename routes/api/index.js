const path = require("path");
const router = require("express").Router();
const cartRoutes = require("./cart");
const googleRoutes = require("./google");
const checkoutRoutes = require("./checkout");
const orderDetailsRoutes = require("./orderdetails");
const orderHistoryRoutes = require("./orderHistory");

router.use("/cart", cartRoutes);

router.use("/google", googleRoutes);

router.use("/checkout", checkoutRoutes);

router.use("/orderdetails", orderDetailsRoutes);

router.use("/orderhistory", orderHistoryRoutes);

// For anything else, render the html page
router.use((req, res) => {
  res.sendFile(path.join(__dirname, "../../client/build/index.html"));
});

module.exports = router;
