const mongoose = require("mongoose");
const Actor = require("../models/actorModel")




//GET All Actors
const getActors = async (req, res) => {
    const actors = await Actor.find({}).sort({firstName: 1});

    res.status(200).json(actors);
}




//GET one actor
const getActor = async (req, res) => {
    const { id } = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: "Actor does not exist"});
    }

    const actor = await Actor.findById(id);

    if(!actor) {
        return res.status(404).json({error: "Actor does not exist"});
    }

    res.status(200).json(actor);
}



//CREATE an actor
const createActor = async (req, res) => {
    const {firstName, lastName, birthday} = req.body;

    try {
        const actor = await Actor.create({firstName, lastName, birthday});
        await res.status(200).json(actor);
    }

    catch(err) {
        res.status(400).json({error: err.message});
    }

}




//DELETE an actor
const deleteActor = async (req, res) => {
    const { id } = req.params;
    
    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: "Actor does not exist"});
    }

    const actor = await Actor.findByIdAndDelete({_id: id});

    if(!actor) {
        res.status(404).json({error: "Actor does not exist"});
    }

    res.status(200).json(actor);
}




//UPDATE an actor
const updateActor = async (req, res) => {
    const { id } = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: "Actor does not exist"});
    }

    let actor = await Actor.findOneAndUpdate({_id: id}, req.body);

    if(!actor) {
        res.status(404).json({error: "Actor does not exist"});
    }

    actor = await Actor.findById(id);

    res.status(200).json(actor);

} 



module.exports = {
    getActors,
    getActor,
    createActor,
    deleteActor,
    updateActor
}