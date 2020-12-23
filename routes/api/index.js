const router = require("express").Router();
const mattsComics = require("./mattsComics");

// Book routes
router.use("/mattsComics", mattsComics);

module.exports = router;
