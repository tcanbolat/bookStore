const router = require("express").Router();
const orderHistoryController = require("../../controllers/orderHistoryController");

// Matches with "/api/orderhistory"
router.route("/").get(orderHistoryController.getOrderHistory);

// Matches with "/api/orderhistory/:id"
router.route("/:id").delete(orderHistoryController.deleteOrder);

module.exports = router;
