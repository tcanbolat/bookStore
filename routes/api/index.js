const path = require("path");
const router = require("express").Router();
const cartRoutes = require("./cart");
const googleRoutes = require("./google");
const checkoutRoutes = require("./checkout");
const orderHistoryRoutes = require("./orderHistory");

// cart routes
router.use("/cart", cartRoutes);

// Google routes
router.use("/google", googleRoutes);

// checkout routes
router.use("/checkout", checkoutRoutes);

// orderhistory routes
router.use("/orderhistory", orderHistoryRoutes);

// For anything else, render the html page
router.use((req, res) => {
  res.sendFile(path.join(__dirname, "../../client/build/index.html"));
});

module.exports = router;
