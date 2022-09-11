
let saveIncidentSchema = {
    type: "object",
    properties: {
        client_id: { type: "number" },
        incident_desc: { type: "string", minLength: 2 },
        city: { type: "string", minLength: 4 },
        country:{type:"string",minLength:4},
        weather_report:{
            type:"object"
        }
    },
    additionalProperties: false,
    required: ['client_id', 'incident_desc', 'city','country','weather_report']
}

let fetchIncidentSchema={
    type: "object",
    properties:{
        id: { type: "string" },
    },
    additionalProperties:false,
    required:['id']
}

module.exports= {
    saveIncidentSchema,
    fetchIncidentSchema
};