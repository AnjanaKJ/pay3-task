const express = require('express');
const {authenticateToken} = require('../middlewares/authMiddleware');
const { getUserProfile } = require('../controllers/profileController');

const router = express.Router();

router.get('/profile', authenticateToken, getUserProfile);

module.exports = router;
