const { Pool } = require('pg'); 
class PgConn {
  constructor(db) {
    this.pool = new Pool({
      user: db.user,
      host: db.host,
      database: db.database,
      password: db.password,
      port: db.port,
    });
  }

  async query(command) {
     return this.pool.query(command).then((res) => res.rows);
  }
}

exports.PgConn = PgConn; 
