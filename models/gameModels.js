// Require Mongoose
const mongoose = require("mongoose");

// Define a schema
const Schema = mongoose.Schema;

const GamesSchema = new Schema({
  title: String,
  genre: String,
  releaseDate: String
}, { toJSON: { virtuals: true } });

//add virtuals to games, to include dynamic links
GamesSchema.virtual('_links').get(
  function () {
    return {
      self: {
        href: `${process.env.BASE_URI}games/$this._id`
      },
      collection: {
        href: `${process.env.BASE_URI}games/`
      }
    }
  }
)



// Export function to create "SomeModel" model class
module.exports = mongoose.model("Games", GamesSchema);