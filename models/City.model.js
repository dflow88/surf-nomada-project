const { Schema, model } = require("mongoose");

const citySchema = new Schema(
  {
    cityName: {
        type: String,
        required: [true, 'Name'],
        unique: true
    },
    country: String,
    description: String,
    images: [{ type: String }],
    beaches: [{
        beachName: String,
        beachDescription: String,
        beachImages: [{ type: String }],
    }],
    hotels: [{ type: Schema.Types.ObjectId, ref: "Hotel" }],
  },
  {
    timestamps: true
  }
);
const City = model("City", citySchema);
module.exports = City;