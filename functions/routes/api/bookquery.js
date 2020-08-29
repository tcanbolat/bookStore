const router = require("express").Router();
const queryController = require("../../controllers/queryController");

// Matches with "/api/bookquery"
router
  .route("/")
  .get(queryController.searchForBooks);

module.exports = router;
