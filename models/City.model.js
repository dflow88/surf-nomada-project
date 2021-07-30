const { Schema, model } = require("mongoose");

const citySchema = new Schema(
  {
    cityName: {
        type: String,
        sparse: true,
        unique: true
    },
    destBookingId: String,
    country: {
        type: String,
        sparse: true
    },
    description: String,
    imageUrl: String,
    images: [{ type: String }],
    beaches: [{ type: Schema.Types.ObjectId, ref: "Beach" }],

    hotels:[{ type: Schema.Types.ObjectId, ref: "Hotel" }],
  },
  {
    timestamps: true
  }
);
const City = model("City", citySchema);
module.exports = City;