var pg = require('pg');
var url = require('url');
var config = {
    user: process.env.RDS_USERNAME || null, //env var: PGUSER
    password: process.env.RDS_PASSWORD || null, //env var: PGPASSWORD
    host: process.env.RDS_HOSTNAME || 'localhost', // Server
    port: process.env.RDS_PORT || 5432, //env var: PGPORT
    database: process.env.RDS_DB_NAME || 'mn-senate', //env var: PGDATABASE
    max: 10, // max number of clients in the pool
    idleTimeoutMillis: 30000, // how long a client is allowed to remain idle before being closed
};

module.exports = new pg.Pool(config);
