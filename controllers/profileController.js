const User = require('../models/User'); // Ensure path is correct// Ensure path is correct

const getUserProfile = async (req, res) => {
  try {
    //console.log("ghghg",req.user._id)
    const userId = req.user._id;
    const user = await User.findById(userId);
    if (!user) {
      console.log('User not found fn')
      return res.status(404).json({ message: 'User not found fn' });
    }

    const userProfile = {
      id: userId,
      username: user.username,
      email: user.email,
      name: user.name,
      phoneNumber: user.phoneNumber,
      dateOfBirth: user.dateOfBirth,
      bio: user.bio,
      location: user.location,
      profilePicture: user.profilePicture
    };

    res.status(200).json(userProfile);

  } catch (error) {

    res.status(500).json({ message: error.message });
  }
};

module.exports = { getUserProfile };