import { Schema, model } from "mongoose";
import { UserType } from "../types/IUser";

const userSchema = new Schema<UserType>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  hashedPassword: { type: String, required: true },
  profilePicture: {
    secure_url: String,
    cloudinary_id: String,
  },
});

const User = model<UserType>("User", userSchema);

export default User ;