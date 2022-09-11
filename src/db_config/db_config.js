
module.exports = {
    postgresdb: {
      local: {
        host: process.env.PG_HOST ||'anything.amazonaws.com',
        user: process.env.PG_USER  ||'postgres' ||,
        password: process.env.PG_PASSWD  ||"9XkaqkyTnldoQ",
        database: process.env.PG_DBNAME   || 'anything',
        port: process.env.PG_PORT || 5432,
        ssl: {
           rejectUnauthorized: false
        },
        connectionTimeoutMillis: process.env.PG_CONNECT_TIMEOUT || 25000,
        idleTimeoutMillis: process.env.PG_IDLE_TIMEOUT || 10000,
        max: process.env.PG_MAX_POOL || 400,
       
      }   
      
    }
  }
  
