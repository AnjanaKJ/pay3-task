const express = require('express');
const {authenticateToken} = require('../middlewares/authMiddleware');
const { getUserProfile } = require('../controllers/profileController');

const router = express.Router();

// Endpoint to get user profile data
router.get('/profile', authenticateToken, getUserProfile);

module.exports = router;
