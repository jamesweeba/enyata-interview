let schemas = require('./schema');
let { validate, paramKeys} = require('../utils/utils');
let sql = require('../sql_factory/incident_sql_queries/incident_sql_queries')
const pgstream = require('pgconnect-lite');


function saveIncident(dbConnection, data) {
    return new Promise((resolve, reject) => {
        let schema = schemas.saveIncidentSchema;
        let status = validate(schema, data);
        let sqlquery = sql.saveIncidents();
        if (!status.isValid) {
            return reject({
                status: 400,
                message: 'INVALID_PARAMS',
                errors: status.err.errors
            });
        }
        let { client_id, incident_desc, city, country, weather_report } = data;
        let params = [client_id, incident_desc, city, country, JSON.stringify(weather_report)]
        // console.log(params)
        pgstream.insert(dbConnection, sqlquery, params).then(() => {
            return resolve({ status_code: 201, message: "success" });
        }).catch(err => {
            console.log(err);
            return reject(err)
        })
    })
}

function fetchIncidents(dbConnection, data) {
    return new Promise((resolve, reject) => {
        let limit = parseInt(data.limit);
        let page = data.offset;
        let fields =  paramKeys(data)
        let sqlquery = sql.fetchIncidents(fields, limit, page);
        let params = [limit, page];
        console.log(params)
        if (fields.length > 0) {
            params = fields.map(key => data[key]).concat([limit, page])
        }
        console.log(params)
        pgstream.fetch(dbConnection, sqlquery, params).then(response => {
            return resolve(response.data)
        }).catch(err => {
            return reject(err);
        })
    })
}

function fetchIncident(dbConnection, data) {
    return new Promise((resolve, reject) => {
        let schema = schemas.fetchIncidentSchema;
        let status = validate(schema, data);
        if (!status.isValid) {
            return reject({
                status: 400,
                message: 'INVALID_PARAMS',
                errors: status.err.errors
            });
        }
        let sqlquery = sql.fetchIncident()
        let params = [data.id];

        pgstream.fetchOne(dbConnection, sqlquery, params).then(response => {
            return resolve(response.data)
        }).catch(err => {
            return reject(err);
        })
    })
}

function countIncidents(dbConnection,data) {
    return new Promise((resolve, reject) => {
        let fields =paramKeys(data)
        let countsql = sql.countIncidents(fields);
        let params = []
        if (fields.length > 0) {
            params = fields.map(key => data[key] )
        }
        pgstream.fetchOne(dbConnection, countsql, params).then(count => {
            return resolve(count.data);
        }).catch(err => {
            return reject(err);
        })
    })
}




module.exports = {
    saveIncident,
    fetchIncidents,
    countIncidents,
    fetchIncident
}