const mysql = require('mysql2')

const env = require('../config/dotenv')

const config = {
  host: env('dbHost'),
  user: env('dbUsername'),
  password: env('dbPassword'),
  database: env('db')
}

const connection = mysql.createPool(config)

module.exports = connection