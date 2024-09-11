const User = require('../models/User');
const bcrypt = require('bcrypt');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const cloudinary = require('cloudinary').v2;

require('dotenv').config();
const JWT_SECRET = process.env.JWT_SECRET;

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

const createAccount = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { username, name, email, phoneNumber, password, dateOfBirth, bio,  location } = req.body;

  try {
    const existingUser = await User.findOne({
      $or: [{ username }, { email }, { phoneNumber }]
    });
    if (existingUser) {
      return res.status(400).json({ message: 'Username, email, or phone number already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      name,
      email,
      phoneNumber,
      password: hashedPassword,
      dateOfBirth,
      bio,
      location
    });

    await newUser.save();

    res.status(201).json({ message: 'User created successfully'});

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};


const uploadProfilePhoto = async (req, res) => {
  try {

    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const userId = req.user._id;

    if (!userId) {
      return res.status(400).json({ message: 'User ID is required' });
    }

    const fileName = `${userId}_profile_${Date.now()}`;

    cloudinary.uploader.upload_stream(
      {
        folder: 'profile_photos',
        public_id: fileName,
        use_filename: true,
        unique_filename: false,
      },
      async (error, result) => {
        if (error) {
          console.error('Error uploading profile photo:', error);
          return res.status(500).json({ message: 'Server error' });
        }

        const updatedUser = await User.findByIdAndUpdate(
          userId,
          { profilePicture: result.secure_url },
          { new: true }
        );

        if (!updatedUser) {
          return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({
          message: 'Profile photo uploaded successfully' });
      }
    ).end(req.file.buffer);
  } catch (error) {
    console.error('Error uploading profile photo:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

async function loginUser(req, res) {
    try {
      const { username, password } = req.body;
      if (!username || !password) {
        return res.status(400).json({ error: 'Username and password are required' });
      }

      const user = await User.findOne({ username });
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(401).json({ error: 'Invalid login credentials' });
      }

      const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '1h' });
      res.status(200).json({ message: 'Login successful', token });
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  }



module.exports = {
  createAccount, uploadProfilePhoto, loginUser
};
