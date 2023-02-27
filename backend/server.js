const express = require("express");
require("dotenv").config();
const routes = require("./routes/actors");
const mongoose = require("mongoose");

const app = express();

app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
})


//Middlewares
app.use(express.json());


//Respond to requests
app.use("/api/actors", routes);


//connect to database
mongoose.set('strictQuery', false);
mongoose.connect(process.env.URI)
    .then(() => {
        console.log("Connected to database")
    })
    .catch(err => console.log(err));



//Listening for requests
app.listen(process.env.PORT, () => {
    console.log("Connected to PORT ", process.env.PORT);
})
