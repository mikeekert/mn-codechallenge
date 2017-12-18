var pg = require('pg');
var url = require('url');

if (process.env.DATABASE_URL) {
    var params = url.parse(process.env.DATABASE_URL);
    var auth = params.auth.split(':');
  
    config = {
      user: auth[0],
      password: auth[1],
      host: params.hostname,
      port: params.port,
      database: params.pathname.split('/')[1],
      ssl: true, // heroku requires ssl to be true
      max: 10, // max number of clients in the pool
      idleTimeoutMillis: 30000, // how long a client is allowed to remain idle before being closed
    };
  
  } else {
    config = {
      user: process.env.RDS_USERNAME || null, //env var: PGUSER
      password: process.env.RDS_PASSWORD || null, //env var: PGPASSWORD
      host: process.env.RDS_HOSTNAME || 'localhost', // Server hosting the postgres database
      port: process.env.RDS_PORT || 5432, //env var: PGPORT
      database: process.env.RDS_DB_NAME || 'mn-senate', //env var: PGDATABASE
      max: 10, // max number of clients in the pool
      idleTimeoutMillis: 30000, // how long a client is allowed to remain idle before being closed
    };
  }
  

module.exports = new pg.Pool(config);
