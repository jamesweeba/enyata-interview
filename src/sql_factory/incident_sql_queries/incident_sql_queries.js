module.exports = {
    saveIncidents: () => {
        let sql = `insert into incidents
                    (client_id,incident_desc,city,country,weather_report)
                    values ($1,$2,$3,$4,$5) returning client_id,incident_desc,city,country,weather_report,date`;
        return sql;

    },

    fetchIncidents: (fields) => {
        let sql=  fields.length > 0 ? `select client_id,incident_desc,city,country,weather_report,date   from incidents where ${fields.map((v,i)=>v + "=$"+(i+1)).join(" and ")} limit $${fields.length+1} offset $${fields.length+2} ` :
             `select client_id,incident_desc,city,country,weather_report,date   from incidents limit $1 offset $2`;
     return sql ;

    },

    countIncidents:()=>{
        let sql=`select count(*) from incidents`;
        return sql;
    }
}
