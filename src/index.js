const express = require("express");
const app = express();
const pgstream = require('pgconnect-lite');
const dbConfig = require("./db_config/db_config")
const { setUp } = require("./core/routes")
const path = require('path');
const port = process.env.PORT || 1800
const swaggerJSDoc =require('swagger-jsdoc');
const swaggerUI=require('swagger-ui-express')

const swaggerOption={
    definition: {
        openapi: '3.0.0',
        info: {
            title: "incidents report api",
            version: "1.0.0",       
            servers: [
                {
                    url: "http://localhost:1800"
                }
            ]
        }
    },
    apis: [`${__dirname}/incidents/route.js`]
}


const specs=swaggerJSDoc(swaggerOption);
app.use("/api-docs",swaggerUI.serve,swaggerUI.setup(specs));
pgstream.init(dbConfig.postgresdb['local']);
app.get("/", (req, res) => {return res.sendFile(path.join(__dirname, "/public/readme.txt"))})

setUp(app);
app.listen(port, () => {console.log("magic happens on port " + port)})
