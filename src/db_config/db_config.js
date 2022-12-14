
  module.exports = {
    postgresdb: {
      local: {
        host: process.env.PG_HOST ||'dpg-cecllp94rebeiecml2kg-a.oregon-postgres.render.com',
        user: process.env.PG_USER  ||'enyeta',
        password: process.env.PG_PASSWD  ||'7VP95TppNuDXj4CF8weLhMp2VCc4EuEo',
        database: process.env.PG_DBNAME   || 'incident_db',
        port: process.env.PG_PORT || 5432,
        ssl: {
           rejectUnauthorized: true
        },
        connectionTimeoutMillis: process.env.PG_CONNECT_TIMEOUT || 7200,
        idleTimeoutMillis: process.env.PG_IDLE_TIMEOUT || 7200,
        max: process.env.PG_MAX_POOL || 400,
       
      }   
      
    }
  }


  
  