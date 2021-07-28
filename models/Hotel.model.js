const { Schema, model } = require("mongoose");

const hotelSchema = new Schema(
  {
    hotel_name: {
        type: String,
        required: [true, 'Name'],
        unique: true
    },
    destination: String,
    hotel_type: String,
    bookingUrl: String,
    images: [{ type: String }],
  },
  {
    timestamps: true
  }
);
const City = model("City", citySchema);
module.exports = City;