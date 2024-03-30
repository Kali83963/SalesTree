const express = require('express');
const authController = require('../controller/authController');
const validateToken = require('../middleware/validateToken');
const router = express.Router();

router.post('/register',authController.registerUserContoller);


router.post('/login',authController.loginUserController);


router.get('/current',validateToken,authController.currentUser);
router.get('/logout',validateToken,authController.currentUser);
router.post('/forgot-password',authController.forgotPasswordController);
router.get('/reset-password/:token',authController.resetPasswordConfirmationController);
router.post('/reset-password/:token',authController.resetPasswordController)



module.exports = router;