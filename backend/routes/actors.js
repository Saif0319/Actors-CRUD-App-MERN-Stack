const router = require("express").Router();
const actorController = require("../controllers/actorController")




router.get("/", actorController.getActors);

router.post("/", actorController.createActor);






module.exports = router
