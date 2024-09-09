const express = require('express');
const { body } = require('express-validator');
const upload = require('../middlewares/multer');
const {authenticateToken} = require('../middlewares/authMiddleware');
const userController = require('../controllers/userController');
const { loginRateLimiter } = require('../middlewares/rateLimiter');

const router = express.Router();

router.post('/create', userController.createAccount);
router.post('/upload-profile', authenticateToken, upload.single('profilePicture'), userController.uploadProfilePhoto);
router.post('/login',loginRateLimiter, userController.loginUser);

module.exports = router;
