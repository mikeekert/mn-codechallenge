var pg = require('pg');
var url = require('url');
var config = {
    user: process.env.PGUSER || null, //env var: PGUSER
    password: process.env.PGPASSWORD || null, //env var: PGPASSWORD
    host: process.env.PGSERVER || 'localhost', // Server
    port: process.env.PGPORT || 5432, //env var: PGPORT
    database: process.env.PGDATABASE || 'mn-senate', //env var: PGDATABASE
    max: 10, // max number of clients in the pool
    idleTimeoutMillis: 30000, // how long a client is allowed to remain idle before being closed
    connectionString: process.env.DATABASE_URL,
    ssl: true
};

module.exports = new pg.Pool(config);
