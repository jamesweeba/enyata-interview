


  // postgres://aspewvzp:0qyBzoB1yEhALYJr2Rw5AwOFf_kvtDVj@mel.db.elephantsql.com/aspewvzp 

  module.exports = {
    postgresdb: {
      local: {
        host: process.env.PG_HOST ||'dpg-cecllp94rebeiecml2kg-a.oregon-postgres.render.com',
        user: process.env.PG_USER  ||'enyeta'||'euqwewwhdngquo'||'postgres' ||"insyt",
        password: process.env.PG_PASSWD  ||'7VP95TppNuDXj4CF8weLhMp2VCc4EuEo'||"9XkaqkyTnldoQ",
        database: process.env.PG_DBNAME   || 'incident_db'||'dbm6qjjnlmj647',
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


  //postgres://enyeta:7VP95TppNuDXj4CF8weLhMp2VCc4EuEo@dpg-cecllp94rebeiecml2kg-a.oregon-postgres.render.com/incident_db
  
  