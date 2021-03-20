var express = require('express');
var router = express.Router();
var userController = require('../controllers/userController');
const {auth} = require('../middlewares/auth');


/* GET users listing. */
router.get('/', userController.getUsers);

/** GET the current authenticated user */
router.get('/me', auth, userController.me);


/* GET single user. */
router.get('/:userId', userController.getSingleUser);

/* SIGNUP. */
router.post('/signup', userController.signup);  

/* LOGIN */
router.post('/login', userController.login);

/* GET ALL JOBS */
router.get('/employer/jobs',auth, userController.getAllJobs);

/* GET APPLIED JOB */
router.get('/worker/jobs',auth, userController.getAppliedJobs);

/* INCOMING SMS HANDLER */
router.post('/sms', userController.jobApplication);

module.exports = router;
