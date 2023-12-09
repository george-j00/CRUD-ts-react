const User = require("../modals/user.schema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cloudinary = require("../services/cloudinary");

const saltRounds = 10;

const signUp = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ error: "Email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const user = new User({
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

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email: email });
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
      const accessToken = jwt.sign(payload, secretKey, { expiresIn: "15m" });

      // console.log('access token' , accessToken);

      return res
        .status(201)
        .json({
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

const editProfile = async (req, res) => {
  const { name, email, userId } = req.body;

  const updatedUserData = {
    name,
    email,
  };

  console.log(updatedUserData);
  
  let result;

  if (req.file && req.file.path !== undefined) {
    // Upload the file to Cloudinary
    result = await cloudinary.uploader.upload(req.file.path);
    if (result) {
      updatedUserData.profilePicture = {
        secure_url: result.secure_url,
        cloudinary_id: result.public_id,
      };
    }
  }

  try {
    const updatedUser = await User.findOneAndUpdate(
      { _id: userId },
      updatedUserData,
      { new: true } // To return the updated user
    );

    if (updatedUser) {                                                
      return res.json({ message: 'Profile updated successfully', user: updatedUser });
    } else {
      return res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    return res.status(500).json({ error: 'An error occurred while updating the profile' });
  }
};

module.exports = {
  signUp,
  login,
  editProfile,
};
