


//GET All Actors
const getActors = async (req, res) => {
    await res.status(200).json("ALL ACTORS ARE FETCHED");
}


//GET one actor



//CREATE an actor
const createActor = async (req, res) => {
    await res.status(200).json(req.body);
}

//DELETE an actor



//UPDATE an actor

module.exports = {
    getActors,
    createActor
}