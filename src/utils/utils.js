const request = require('request');
const pgStream = require('pgconnect-lite');
let Ajv = require('ajv');
const ajv = new Ajv({ allErrors: true, validateFormats: false });



function makeHttpRequest(data) {
    return new Promise((resolve, reject) => {
        let args = {
            url: data.url,
            headers: data.headers,
            body: data.body,
            method: data.method,
            json: data.json
        };
        request(args, (err, response) => {
            if (err) {
                console.error(err);
                return reject(err);
            }
            return resolve((response) ? response.body : {});
        });
    });
}

const success = function (data, dbConnection, res) {
    pgStream.commit(dbConnection).then(() => {
        switch (data.status_code) {
            case 200:
                return res.status(data.status_code).json(data);
            case 201:
                return res.status(data.status_code).json(data);
            case 404:
                return res.status(data.status_code).json(data);
            default:
        }

    }).catch(err => {
        return res.status(500).json({
            statusCode: 500,
            message: 'Internal server error',
        });
    })

}

const validate = (schema, data) => {
    let validate = ajv.compile(schema);
    let err = null;
    let isValid = validate(data);

    if (!isValid) {
        err = new Error('Invalid data for schema');
        Error.captureStackTrace(err, validate);
        err.errors = errors(validate);
    }

    let output = { err, isValid };
    return output;
};

const errors = (validate) => {
    let output = validate.errors.map(err => {
        if (err.keyword == 'additionalProperties') {
            return {
                field: err.params.additionalProperty,
                message: 'This is is not a valid field, should not be part of request'
            };
        }
        if (err.keyword == 'required') {
            return {
                field: err.params.missingProperty,
                message: 'This is a required field. It is missing from request'
            };
        }

        return {
            field: err.dataPath,
            message: err.message,
            params: err.params
        };
    });

    return output;
};

const error = function (data, dbConnection, res) {
    pgStream.rollback(dbConnection).then(() => {
        switch (data.status) {
            case 400:
                return res.status(400).json({ ...data });
            default:
                return res.status(500).json({ status: 500, "message": "Internal server error" });
        }
    }).catch(err => {
        console.log(data);
        return res.status(500).json({ status: 500, "message": "Internal server error" });
    })
}

const paramKeys = function (data) {
    let fields = Object.keys(data).
    filter(key=>key!="page" && key!="limit" && key!="total" && key!="offset");
    return fields
}



module.exports = {
    makeHttpRequest,
    success,
    validate,
    error,
    paramKeys
}


