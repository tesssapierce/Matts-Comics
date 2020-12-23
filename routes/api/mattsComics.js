const router = require("express").Router();
const mattsComicsController = require("../../controllers/mattsComicsController");

// Matches with "/api/mattsComics"
router.route("/")
  .get(mattsComicsController.findAll)
  .post(mattsComicsController.create);

// Matches with "/api/mattsComics/:id"
router
  .route("/:id")
  .get(mattsComicsController.findById)
  .put(mattsComicsController.update)
  .delete(mattsComicsController.remove);

module.exports = router;
