
const controller = require("./controller")
const pgstream = require('pgconnect-lite');
const { makeHttpRequest, success, error } = require("../utils/utils")
const config = require("../config/config")


function saveIncident(req, res) {
    dbConnection = null;
    let requestPayload = req.body;
    pgstream.connect().then(dbClient => {
        return dbClient
    }).then(dbClient => {
        dbConnection = dbClient
        let requestData = {
            url: `${config.weatherBaseUrl}/data/2.5/weather?q=Ghana,accra&APPID=${config.weatherApiKey}`,
            method: 'GET',
            json: true,
        };
        return makeHttpRequest(requestData)
    }).then((response) => {
        requestPayload.weather_report = response;
        return controller.saveIncident(dbConnection, requestPayload)
    }).then(response => {
        success(response, dbConnection, res)
    }).catch(err => {
        console.log(err);
        error(err, dbConnection, res)
    })


}

function fetchIncidents(req, res) {
    dbConnection = null;
    let data = req.query;
    let payload={}

    
    pgstream.connect().then(dbClient => {
        return dbClient
    }).then(dbClient => {
        dbConnection = dbClient
        return controller.countIncidents(dbConnection)
    }).then((countResponse) => {
        let totalCount = parseInt(countResponse.count);
        let { limit, page } = data;
        if (isNaN(page) || !page || page < 1) {
            data.page = 1;
        }
        if (isNaN(limit) || !limit) {
            data.limit = 100;
        }
        if (limit > 100) {
            data.limit = 100;
        }
        if (limit < 1) {
            data.limit = 1;
        }
        const maxPageLimit = Math.ceil(parseInt(totalCount) / data.limit);
        if (maxPageLimit < data.page) {
            data.page = maxPageLimit;
        }
        let offset = (data.page - 1) * data.limit;
        data.offset = offset;
        total=data.total;
        payload.total= totalCount;
        payload.page=data.page;
        return controller.fetchIncidents(dbConnection, data)
    }).then(response => {
        let { count } = response;
        let {page,total}=payload;
        let combined = {
            total:   total,
            pageSize: response.count,
            pageNumber: page,
            data: response.items
        }
        let data = { status_code: 200, data: combined }
        if (count == 0) {
            data = { status_code: 404, message: "Not found" }
        }
        success(data, dbConnection, res)
    }).catch(err => {
        error(err, dbConnection, res)
    })

}

module.exports = {
    saveIncident,
    fetchIncidents

}