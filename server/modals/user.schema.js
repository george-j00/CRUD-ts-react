const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  hashedPassword: {
    type: String,
    required: true,
  },
  profilePicture: {
    secure_url: { type: String },
    cloudinary_id: { type: String },
  },
});

const User = mongoose.model("User", userSchema);
module.exports = User;
