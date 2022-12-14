const express = require("express");
const router = express.Router();
const service = require("./service")




/**
 * @swagger
 * tags:
 *  name: Incidents
 *  description: The incident report API
 */


/**
 * @swagger
 * components:
 *  schemas:
 *   Incidents:
 *     type: object
 *     required:
 *      - client_id
 *      - incident_desc
 *      - city
 *      - country
 *     properties:
 *      client_id:
 *        type: number
 *        description: the client id
 * 
 *      incident_desc:
 *        type: string
 *        description: the incident description
 * 
 *      city:
 *        type: string
 *        description: the city where the incident was reported from
 * 
 *      country:
 *        type: string
 *        description: the country where the incident was reported from 
 * 
 *      weather_report:
 *       type: object
 *       description: weather report info
 *      
 *      date:
 *         type: string
 *         format: date
 *         description: date incident was reported
 */

/**
 * @swagger
 * components:
 *  schemas:
 *   Create_Incident:
 *     type: object
 *     required:
 *      - client_id
 *      - incident_desc
 *      - city
 *      - country
 *     properties:
 *      client_id:
 *        type: number
 *        description: the client id
 * 
 *      incident_desc:
 *        type: string
 *        description: the incident description
 * 
 *      city:
 *        type: string
 *        description: the city where the incident was reported from
 * 
 *      country:
 *        type: string
 *        description: the country where the incident was reported from 
 */


/**
 * @swagger
 * /api/v1/incidents:
 *    get:
 *     summary: Returns the list of all reported incodents
 *     responses:
 *       200:
 *         description: The list of all the books
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Incidents'
 *       404:
 *          description: Not Found
 *       400:
 *         description: Bad Request
 *       500:
 *          description: Internal server error
 */
router.get("/", service.fetchIncidents);




/**
 * @swagger
 * /api/v1/incidents:
 *  post:
 *   summary: Create a new incident
 *   requestBody:
 *    required: true
 *    content:
 *     application/json:
 *       schema:
 *        $ref: '#/components/schemas/Create_Incident'
 * 
 *   responses:
 *     201:
 *       description: Incident Created Successfully
 *     400:
 *       description: Bad Request
 *     500: 
 *       description: Internal server error
 */

router.post("/", service.saveIncident);





module.exports = router

