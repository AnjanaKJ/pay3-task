const express = require('express');
const { check } = require('express-validator');
const upload = require('../middlewares/multer');
const {authenticateToken} = require('../middlewares/authMiddleware');
const userController = require('../controllers/userController');
const { loginRateLimiter } = require('../middlewares/rateLimiter');

const router = express.Router();

router.post('/create',[
  check('email', 'Please provide a valid email').isEmail(),
  check('username', 'Username is required').notEmpty(),
  check('password', 'Password must be at least 6 characters').isLength({ min: 6 })
], userController.createAccount);
router.post('/upload-profile', authenticateToken, upload.single('profilePicture'), userController.uploadProfilePhoto);
router.post('/login',loginRateLimiter, userController.loginUser);

module.exports = router;
