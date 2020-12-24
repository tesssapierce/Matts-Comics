const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const mattsComicsSchema = new Schema({
  volume: { type: String, required: true },
  id: { type: Number, required: true},
  publisher: { type: String, required: true },
  issues: [
    {
      number: {
        type: Number
      },
      owned: {
        type: Boolean
      }
    }
  ]
});

const MattsComics = mongoose.model("MattsComics", mattsComicsSchema);

module.exports = MattsComics;
