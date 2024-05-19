const express = require('express')
const router = express.Router()
const multer = require('multer');
const upload = multer();

const LoginController = require('../controllers/Users subsystem/LoginController')
const loginController = new LoginController();
const SignUpController = require('../controllers/Users subsystem/SignUpController')
const signUpController = new SignUpController();
const HomePageController = require('../controllers/Posts search management subsystem/HomePageController')
const homePageController = new HomePageController();
const UploadController = require('../controllers/Posts management subsystem/UploadController')
const uploadController = new UploadController();
const PostsController = require('../controllers/Posts search management subsystem/PostsController')
const postsController = new PostsController();
const ReservationController = require('../controllers/ReservationController');
const reservationController = new ReservationController();
const UserController = require('../controllers/UserController');
const userController = new UserController();
const CategoryController = require('../controllers/Administration subsystem/CategoryController')
const categoryController = new CategoryController();


router.route('/signupOpen').post(signUpController.open)

router.route('/signup').post(signUpController.signUp)

router.route('/toHome').post(homePageController.navigateToHome)

router.route('/loginOpen').post(loginController.open)

router.route('/login').post(loginController.login)

router.route('/logout').post(loginController.logOut)

router.route('/uploadOpen').post(uploadController.navigateToUpload)

router.route('/upload').post(upload.single('image'), uploadController.upload)

router.route('/getPosts').post(postsController.getPosts)

router.route('/post/:postId').get(postsController.getPost)

router.route('/reserve').post(reservationController.addReservation);
router.route('/openCategorys').post(categoryController.open)

router.route('/fetchCategorys').post(categoryController.findCategorys)

router.route('/addCategory').post(categoryController.create)

router.route('/openCategorysList').post(categoryController.openList)

router.route('/getPostsByCategory/:categoryId').get(postsController.getPostsById)

router.route('/deleteCategory').post(categoryController.delete)


router.route('/reservations/post/:postId').get(reservationController.getReservationsByPostId);

router.route('/user/:userId').get(userController.getUserById)

router.route('/user/:userId/creditsAdd').post(userController.appendCredits)

router.route('/user/:userId/creditsSubtract').post(userController.subtractCredits)

module.exports = router