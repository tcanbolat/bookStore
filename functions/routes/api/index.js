const router = require("express").Router();
const cartRoutes = require("./cart");
const queryRoutes = require("./bookquery");
const checkoutRoutes = require("./checkout");
const orderDetailsRoutes = require("./orderdetails");
const orderHistoryRoutes = require("./orderhistory");

router.use("/cart", cartRoutes);

router.use("/bookquery", queryRoutes);

router.use("/checkout", checkoutRoutes);

router.use("/orderdetails", orderDetailsRoutes);

router.use("/orderhistory", orderHistoryRoutes);

module.exports = router;
