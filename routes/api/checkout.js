const router = require("express").Router();
const checkoutController = require("../../controllers/checkoutController");

// Matches with "api/checkout"
router.route("/").put(checkoutController.checkoutCart);

module.exports = router;
