const router = require("express").Router();
const orderHistoryController = require("../../controllers/orderHistoryController");

router.route("/").get(orderHistoryController.getOrderHistory);

module.exports = router;
