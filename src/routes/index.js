const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware');

const firebaseAuthController = require('../controllers/firebase-auth-controller');
const PostsController = require('../controllers/posts-controller.js');


// Auth routes
router.post('/auth/register', firebaseAuthController.registerUser);
router.post('/auth/login', firebaseAuthController.loginUser);
router.post('/auth/logout', firebaseAuthController.logoutUser);
router.post('/auth/reset-password', firebaseAuthController.resetPassword);

//posts routes
router.get('/auth/posts', verifyToken, PostsController.getPosts);
//
router.use(require('./table/province.js'));
router.use(require('./table/distritct.js'));
router.use(require('./table/Subdistrict.js'));
router.use(require('./table/address.js'));
router.use(require('./table/user.js'));
router.use(require('./table/store.js'));
router.use(require('./table/categories.js'));
router.use(require('./table/size.js'));
router.use(require('./table/products.js'));
router.use(require('./table/productSizes.js'));
router.use(require('./table/productCategories.js'));
router.use(require('./table/filterproduct.js'));
router.use(require('./table/productPhotos.js'));



module.exports = router;
