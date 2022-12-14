let schemas = require('./schema');
let { validate } = require('../utils/utils');
let sql = require('../sql_factory/incident_sql_queries/incident_sql_queries')
const pgstream = require('pgconnect-lite');


function saveIncident(dbConnection, data) {
    return new Promise((resolve, reject) => {
        let schema = schemas.saveIncidentSchema;
        let status = validate(schema, data);
        let insertIncident = sql.saveIncidents();
        if (!status.isValid) {
            return reject({
                status: 400,
                message: 'INVALID_PARAMS',
                errors: status.err.errors
            });
        }
        let { client_id, incident_desc, city, country, weather_report } = data;
        let params = [client_id, incident_desc, city, country, JSON.stringify(weather_report)]
        pgstream.insert(dbConnection, insertIncident, params).then((response) => {
            let{items}=response.data;
            return resolve({ status_code: 201, message: "success" ,data:items[0]});
        }).catch(err => {
            return reject(err)
        })
    })
}


function fetchIncidents(dbConnection, data) {
    return new Promise((resolve, reject) => {
        let limit = parseInt(data.limit);
        let page = data.offset;
        delete data.page;
        delete data.limit;
        delete data.offset;
        let fields = Object.keys(data);
        let fetchdata = sql.fetchIncidents(fields, limit, page);
        let params = [limit, page];
        if (fields.length > 0) {
            params = fields.map(key => data[key]).concat([limit,page])
        }
        pgstream.fetch(dbConnection, fetchdata, params).then(response => {
            return resolve(response.data)
        }).catch(err => {
            return reject(err);
        })
    })
}


function countIncidents(dbConnection) {
    return new Promise((resolve, reject) => {
        let countsql = sql.countIncidents();
        let params = []
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
    countIncidents
}