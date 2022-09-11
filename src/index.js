const express = require("express");
const app = express();
const pgstream = require('pgconnect-lite');
const dbConfig = require("./db_config/db_config")
const { setUp } = require("./core/routes")
const path = require('path');
const port = process.env.PORT || 1800

pgstream.init(dbConfig.postgresdb['local']);
app.get("/", (req, res) => {return res.sendFile(path.join(__dirname, "/public/readme.txt"))})


setUp(app);
app.listen(port, () => {console.log("magic happens on port " + port)})
