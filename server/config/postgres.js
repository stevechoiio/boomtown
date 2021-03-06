const { Pool } = require('pg');

module.exports = app => {
  const host = app.get('PG_HOST');
  const user = app.get('PG_User');
  const pw = app.get('PG_PASSWORD');
  const db = app.get('PG_DB');

  return new Pool({
    host: host,
    user: user,
    password: pw,
    database: db,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000
  });
};
