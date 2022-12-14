
  module.exports = {
    postgresdb: {
      local: {
        host: process.env.PG_HOST ,
        user: process.env.PG_USER  ,
        password: process.env.PG_PASSWD ,
        database: process.env.PG_DBNAME  ,
        port: process.env.PG_PORT ,
        ssl: {
           rejectUnauthorized: true
        },
        connectionTimeoutMillis: process.env.PG_CONNECT_TIMEOUT ,
        idleTimeoutMillis: process.env.PG_IDLE_TIMEOUT ,
        max: process.env.PG_MAX_POOL 
       
      }   
      
    }
  }


  
  