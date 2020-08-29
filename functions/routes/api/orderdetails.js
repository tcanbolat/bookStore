const router = require("express").Router();
const orderDetailsController = require("../../controllers/orderDetailsController");

router.route("/").get(orderDetailsController.getByOrderId);

module.exports = router;
