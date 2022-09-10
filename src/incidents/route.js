const express=require("express");
const router=express.Router();
const service=require("./service")


router.post("/",service.saveIncident);
router.get("/",service.fetchIncidents);



module.exports=router

