module.exports = {
    saveIncidents: () => {
        let sql = `insert into incidents
                    (client_id,incident_desc,city,country,weather_report)
                    values ($1,$2,$3,$4,$5)`;
        return sql;
    },

    fetchIncidents: (fields) => {
        let sql = fields.length > 0 ? `select * from incidents where ${fields.map((v, i) => v + "=$" + (i + 1)).join(" and ")} order by date desc limit $${fields.length + 1} offset $${fields.length + 2} ` :
            `select * from incidents order by date desc limit $1 offset $2`;
        console.log(sql)
        return sql;

    },

    countIncidents: (fields) => {
        let sql = fields.length > 0 ? `select count(*) from incidents where ${fields.map((v, i) => v + "=$" + (i + 1)).join(" and ")}` : `select count(*) from incidents`;
        console.log(sql);
        return sql;
    },
    fetchIncident: () => {
        let sql = `select * from incidents where id=$1`;
        return sql
    }
}

