
module.exports = {
    postgresdb: {
      local: {
        host: process.env.PG_HOST ||'ec2-52-0-203-66.compute-1.amazonaws.com',
        user: process.env.PG_USER  ||'euqwewwhdngquo'||'postgres' ||"insyt",
        password: process.env.PG_PASSWD  ||'5feb7daf3b0ea14cc03eafd72da08b69fbf7e23ca5907dcf45e6681ce4cdacd6'||"9XkaqkyTnldoQ",
        database: process.env.PG_DBNAME   || 'dbm6qjjnlmj647',
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
  
  /*
Host
    ec2-52-0-203-66.compute-1.amazonaws.com
Database
    dbm6qjjnlmj647
User
    euqwewwhdngquo
Port
    5432
Password
    5feb7daf3b0ea14cc03eafd72da08b69fbf7e23ca5907dcf45e6681ce4cdacd6
  */