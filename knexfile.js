// Update with your config settings.
require('dotenv').config()
const connectionString = process.env.DATABASE_URL;

module.exports = {

  development: {
    client: 'sqlite3',
    useNullAsDefault: true,
    connection: {
      filename: './server/usersdb.db3'
    },
    pool: {
      afterCreate: (conn, done) => {
        conn.run('PRAGMA foreign_keys = ON', done)
      },
    },
    migrations: {
      directory: './server/migrations'
    },
    seeds: {
      directory: './server/seeds'
    },
  },
  production: {
    client: 'pg',
    connection: connectionString,
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory:'./server/migrations'
    },
    seeds: {
      directory: './server/seeds'
    },
  }

};
