const User = require("../modals/user.schema");

const getAllUsers = async (req, res) => {
  try {
    const allUsers = await User.find();
    return res.status(201).json({ users: allUsers });
  } catch (error) {
    return res.status(500).json({ error: "Error for getting users " });
  }
};

module.exports = {
  getAllUsers,
};
