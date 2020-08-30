const router = require("express").Router();
const orderDetailsController = require("../../controllers/orderDetailsController");

// Matches with "/api/orderdetails"
router.route("/").get(orderDetailsController.getByOrderId);

module.exports = router;
