const router = require("express").Router();
const orderHistoryController = require("../../controllers/orderHistoryController");

router.route("/").get(orderHistoryController.getOrderHistory);

router.route("/:id").delete(orderHistoryController.deleteOrder);

module.exports = router;
