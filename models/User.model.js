const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    username: {
        type: String,
        trim: true,
        required: [true, 'Username is required'],
        lowercase: true,
        unique: true
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        lowercase: true,
        trim: true,
        match: [/^\S+@\S+\.\S+$/, "Please insert a valid email"]
    },
    password: {
        type: String,
        required: [true, "Password is required"]
    },
    name: String,
    lastName: String,
    stance: String,
    // wavePreference: String,
    country: String,
    pictureUrl: String,
    favoriteCities: [{ type: Schema.Types.ObjectId, ref: "City" }],
  },
  {
    timestamps: true
  }
);
const User = model("User", userSchema);
module.exports = User;