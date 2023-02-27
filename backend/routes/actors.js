const router = require("express").Router();
const actorController = require("../controllers/actorController")



//GET all actors
router.get("/", actorController.getActors);

//GET one actor
router.get("/:id", actorController.getActor);

//CREATE an actor
router.post("/", actorController.createActor);

//DELETE an actor
router.delete("/:id", actorController.deleteActor);

//UPDATE an actor
router.patch("/:id", actorController.updateActor);




module.exports = router
