import bcrypt from "bcrypt";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import User from "../modals/user.schema";
import { UserType } from "../types/IUser";
import cloudinary from "../services/cloudinary";

const saltRounds = 10;

const signUp = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;
  try {
    const existingUser: UserType | null = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ error: "Email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const user: UserType = new User({
      name,
      email,
      hashedPassword,
    });

    await user.save();

    console.log("Successfully added user");
    return res.status(201).json({ message: "User created successfully" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Error while creating user" });
  }
};

const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const existingUser: UserType | null = await User.findOne({ email: email });
    if (!existingUser) {
      return res.status(409).json({ error: "Create Account" });
    }

    const passwordMatch = await bcrypt.compare(
      password,
      existingUser.hashedPassword
    );

    if (passwordMatch) {
      const payload = {
        email: existingUser.email,
      };

      const secretKey = process.env.JWT_SECRET;

      if (!secretKey) {
        throw new Error("JWT_SECRET not found in environment variables");
      }

      const accessToken = jwt.sign(payload, secretKey, { expiresIn: "15m" });

      // console.log('access token' , accessToken);

      return res.status(201).json({
        message: "Login successfully",
        token: accessToken,
        user: existingUser,
      });
    } else {
      return res.status(409).json({ error: "Invalid password" });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Error while Login " });
  }
};

const editProfile = async (req: Request, res: Response) => {
  const { name, email, userId } = req.body;

  const updatedUserData: Partial<UserType> = {
    name,
    email,
  };

  console.log(updatedUserData);

  if (req.file && req.file.path !== undefined) {
    try {
      const result = await cloudinary.v2.uploader.upload(req.file.path);

      if (result) {
        updatedUserData.profilePicture = {
          secure_url: result.secure_url,
          cloudinary_id: result.public_id,
        };
      }
    } catch (error) {
      console.error("Error uploading file to Cloudinary:", error);
      // Handle the error
    }
  }

  try {
    const updatedUser: UserType | null = await User.findOneAndUpdate(
      { _id: userId },
      updatedUserData,
      { new: true } // To return the updated user
    );

    if (updatedUser) {
      return res.json({
        message: "Profile updated successfully",
        user: updatedUser,
      });
    } else {
      return res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ error: "An error occurred while updating the profile" });
  }
};

export default {
  signUp,
  login,
  editProfile
};
