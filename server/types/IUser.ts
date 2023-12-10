import { Document } from "mongoose";

interface UserProfilePicture {
  secure_url: string;
  cloudinary_id: string;
}

export interface UserType extends Document {
  name: string;
  email: string;
  hashedPassword: string;
  profilePicture?: UserProfilePicture;
}
