const User = require('../models/User');

const followUser = async (req, res) => {
  try {
    const userIdToFollow  = req.params.userId;
    const userId = req.user._id;

    const userToFollow = await User.findById(userIdToFollow);
    if (!userToFollow) {
      return res.status(404).json({ message: 'User to follow not found' });
    }

    const currentUser = await User.findById(userId);
    if (currentUser.following.includes(userIdToFollow)) {
      return res.status(400).json({ message: 'You are already following this user' });
    }

    currentUser.following.push(userIdToFollow);
    await currentUser.save();

    userToFollow.followers.push(userId);
    await userToFollow.save();

    res.status(200).json({ message: 'User followed successfully' });
    console.log(`User ${userId} followed user ${userIdToFollow}`);
  } catch (error) {
    console.error('Error following user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = { followUser };
