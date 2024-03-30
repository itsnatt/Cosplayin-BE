const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'cosplayin',
  password: 'postgres',
  port: 5432, // Port default untuk PostgreSQL
});

module.exports = pool;
