const express = require("express");
const app = express();
const { Musician } = require("../models/index")
const { db } = require("../db/connection")

const port = 3000;

//TODO: Create a GET /musicians route to return all musicians 

app.get("/musicians", async (req, res) => {
    const musicians = await Musician.findAll()
    res.json(musicians);
})

app.get("/musicians/:id", async (req, res) => {
    const musician = await Musician.findByPk(req.params.id)
    if (!musician) {
        return res.status(404).json({ message: "Musician not found" })
    }
    res.json(musician);
})



module.exports = app;