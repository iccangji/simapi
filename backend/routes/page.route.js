const router = require('express').Router();
const { asyncHandler } = require('../middlewares/asyncHandler');
const checkUsername = require('../middlewares/checkUsername');
const { signup: signupValidator, signin: signinValidator } = require('../validators/auth');

const authController = require('../controllers/auth.controller');
const kontrolController = require('../controllers/kontrol.controller');
const alatController = require('../controllers/alat.controller');
const historyController = require('../controllers/history.controller');

const { isAuthenticated } = require('../middlewares/isAuthenticated');
const { upload } = require('../middlewares/imageUpload');

const path = require('path');

router.route('/')
    .get(isAuthenticated, asyncHandler((req, res) => {
        res.sendFile(path.join(__dirname, '../../frontend', '/index.html'));
    }));

router.route('/alat')
    .get(isAuthenticated, asyncHandler(alatController.index));

router.route('/api/alat')
    .get(isAuthenticated, asyncHandler(alatController.get));

router.route('/tambah-alat')
    .get(isAuthenticated, asyncHandler(alatController.insert));

router.route('/api/tambah-alat')
    .post(isAuthenticated, upload.single("file"), asyncHandler(alatController.create));

router.route('/kontrol')
    .get(isAuthenticated, asyncHandler(kontrolController.index));

router.route('/api/history/latest')
    .get(isAuthenticated, asyncHandler(historyController.getLatest));

router.route('/history')
    .get(isAuthenticated, asyncHandler(historyController.index));

router.route('/api/history')
    .get(isAuthenticated, asyncHandler(historyController.get));

router.route('/signup')
    .post(signupValidator, asyncHandler(checkUsername), asyncHandler(authController.signup));

router.route('/login')
    .post(signinValidator, asyncHandler(authController.signin));

router.route('/login')
    .get(asyncHandler(authController.signinPage));

router.route('/signup')
    .get(asyncHandler(authController.signupPage));

router.route('/logout')
    .post(asyncHandler(authController.signout));

module.exports = router;