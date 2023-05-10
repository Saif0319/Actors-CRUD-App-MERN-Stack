const router = require("express").Router();
const userController = require("../controllers/userController");


router.post("/signup", userController.signupUser);



router.post("/login", userController.loginUser);


module.exports = router;