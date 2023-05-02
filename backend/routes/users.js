const router = require("express").Router();
const userController = require("../controllers/userController");


router.get("/signup", userController.signupUser);



router.get("/login", userController.loginUser);


module.exports = router;