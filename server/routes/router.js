const express = require('express')
const router = express.Router()
const namesController = require('../controllers/namesController')
const LoginController = require('../controllers/LoginController')
const loginController = new LoginController();
const SignUpController = require('../controllers/SignUpController')
const signUpController = new SignUpController();
const HomePageController = require('../controllers/HomePageController')
const homePageController = new HomePageController();

router.route('/api').get(namesController.Names)

router.route('/signupOpen').post(signUpController.open)

router.route('/signup').post(signUpController.signUp)

router.route('/toHome').post(homePageController.navigateToHome)

router.route('/loginOpen').post(loginController.open)

router.route('/login').post(loginController.login)

router.route('/logout').post(loginController.logOut)


module.exports = router