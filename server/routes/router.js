const express = require('express')
const router = express.Router()
const multer = require('multer');
const upload = multer();

const LoginController = require('../controllers/LoginController')
const loginController = new LoginController();
const SignUpController = require('../controllers/SignUpController')
const signUpController = new SignUpController();
const HomePageController = require('../controllers/HomePageController')
const homePageController = new HomePageController();
const UploadController = require('../controllers/UploadController')
const uploadController = new UploadController();
const PostsController = require('../controllers/PostsController')
const postsController = new PostsController();


router.route('/signupOpen').post(signUpController.open)

router.route('/signup').post(signUpController.signUp)

router.route('/toHome').post(homePageController.navigateToHome)

router.route('/loginOpen').post(loginController.open)

router.route('/login').post(loginController.login)

router.route('/logout').post(loginController.logOut)

router.route('/uploadOpen').post(uploadController.navigateToUpload)

router.route('/upload').post(upload.single('image'), uploadController.upload)

router.route('/getPosts').post(postsController.getPosts)


module.exports = router