require("dotenv").config()
const pgp = require("pg-promise")()

const { DB_NAME, DB_PASS, DB_USER, DB_HOST, DB_PORT } = process.env


const cn = {
    host: DB_HOST,
    port: DB_PORT,
    database: DB_NAME,
    user: DB_USER,
    password: DB_PASS,
};

const db = pgp(cn);

db.one('SELECT $1 AS value', 123)
  .then((data) => {
    console.log("Database connection successful")
  })
  .catch((error) => {
    console.log('Database connection ERROR:', error)
  })

// const db = pgp('postgres://kelue:admin@localhost:5432/fashiondb');
module.exports = db;