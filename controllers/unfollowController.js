const User = require('../models/User');

const unfollowUser = async (req, res) => {
  try {
    const userIdToUnfollow  = req.params.userId;
    const userId = req.user._id;

    const userToUnfollow = await User.findById(userIdToUnfollow);
    if (!userToUnfollow) {
      return res.status(404).json({ message: 'User to unfollow not found' });
    }

    const currentUser = await User.findById(userId);
    if (!currentUser.following.includes(userIdToUnfollow)) {
      return res.status(400).json({ message: 'You are not following this user' });
    }

    currentUser.following.pull(userIdToUnfollow);
    await currentUser.save();

    userToUnfollow.followers.pull(userId);
    await userToUnfollow.save();

    res.status(200).json({ message: 'User unfollowed successfully' });
    console.log(`User ${userId} unfollowed user ${userIdToUnfollow}`);
  } catch (error) {
    console.error('Error unfollowing user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = { unfollowUser };
