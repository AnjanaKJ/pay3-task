const express = require('express');
const { body } = require('express-validator');
const upload = require('../middlewares/multer');
const userController = require('../controllers/userController');

const router = express.Router();

router.post('/create', userController.createAccount);
router.post('/upload-profile', upload.single('profilePicture'), userController.uploadProfilePhoto);
router.post('/login', userController.loginUser);

module.exports = router;
