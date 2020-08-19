const path = require("path");
const router = require("express").Router();
const cartRoutes = require("./cart");
const googleRoutes = require("./google");
const checkoutRoutes = require("./checkout");

// cart routes
router.use("/cart", cartRoutes);

// Google Routes
router.use("/google", googleRoutes);

// checkout Routes
router.use("/checkout", checkoutRoutes);

// For anything else, render the html page
router.use((req, res) => {
  res.sendFile(path.join(__dirname, "../../client/build/index.html"));
});

module.exports = router;
