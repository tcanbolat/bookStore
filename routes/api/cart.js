const router = require("express").Router();
const cartController = require("../../controllers/cartController");

// Matches with "/api/cart"
router.route("/")
    .get(cartController.getAll)
    .post(cartController.addToCart);

// Matches with "/api/cart/:id"
router.route("/:id")
    .delete(cartController.delete);

module.exports = router;
