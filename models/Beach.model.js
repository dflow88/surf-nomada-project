

[{
    beachName: String,
    beachDescription: String,
    beachImages: [{ type: String }],
}],


const { Schema, model } = require("mongoose");

const beachSchema = new Schema(
  {
    beachName: String,
    beachDescription: String,
    beachImages: [{ type: String }]
  },
  {
    timestamps: true
  }
);
const Beach = model("Beach", beachSchema);
module.exports = Beach;