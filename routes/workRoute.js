var express = require('express');
var router = express.Router();

const { addBlog } = require("../controllers/blogController");
const { index, logi, dashboard, records,  ddl } = require("../controllers/fatchController");
const { login } = require('../controllers/userController');
const { addTask } = require('../controllers/workController');
const { doTask } = require('../controllers/workController');

// /* GET home page. */
// router.get('/', function (req, res, next) {
//   res.render('index', { title: 'Express' });
// });


router.route("/addBlog").post(addBlog);
router.route("/").get(index);
router.route("/index").get(index);
router.route("/login").get(logi);
router.route("/login").post(login);
router.route("/logout").get(index);
router.route("/dashboard").get(dashboard);
router.route("/dashboard").post(dashboard);
router.route("/records").get(records);
router.route("/records").post(records);
router.route("/task").post(addTask);
router.route("/dotask").get(doTask);
router.route("/download").post(ddl);

module.exports = router;