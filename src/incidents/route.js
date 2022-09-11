const express=require("express");
const router=express.Router();
const service=require("./service")


router.post("/",service.saveIncident);
router.get("/",service.fetchIncidents);
router.get("/:id",service.fetchIncident);



module.exports=router

