
const incidents=require("../incidents/route")
const bodyParser = require("body-parser");
const cors = require("cors");

function setUp(app){
    app.use(bodyParser.json({ limit: '50mb' }), bodyParser.urlencoded({ extended: true, limit: '50mb' }));
    app.use(cors()); 
    app.use("/api/v1/incidents",incidents);
    
}

module.exports={
    setUp
}