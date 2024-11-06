const express = require("express");
const app = express();
const { Musician } = require("../models/index")
const { db } = require("../db/connection")
const router = require("./routes/musicians")
const port = 3000;

app.use(express.json());
app.use(express.urlencoded());
app.use('/musicians', router)

//TODO: Create a GET /musicians route to return all musicians 

module.exports = app;