module.exports = {
    saveIncidents: () => {
        let sql = `insert into incidents
                    (client_id,incident_desc,city,country,weather_report)
                    values ($1,$2,$3,$4,$5)`;
        return sql;

    },

    fetchIncidents: (fields) => {
        let sql=  fields.length > 0 ? `select * from incidents where ${fields.map((v,i)=>v + "=$"+(i+1)).join(" and ")} limit $${fields.length+1} offset $${fields.length+2} ` :
             `select * from incidents limit $1 offset $2`;
    //  let sql="select * from incidents limit ";
     console.log(sql)
    // let sql=`select * from prices where ${fields.map((v,i)=>v + "=$"+(i+1)).join(" and ")} order by posted_ts desc limit 1`;
     return sql ;

    },

    countIncidents:()=>{
        let sql=`select count(*) from incidents`;
        return sql;
    }
}

