const dotenv = require('dotenv')

dotenv.config()

const env = type => {
  switch (type) {
    case 'port': return process.env.PORT
    case 'db': return process.env.MYSQL_DATABASE
    case 'dbHost': return process.env.MYSQL_HOST
    case 'dbUsername': return process.env.MYSQL_USERNAME
    case 'dbPassword': return process.env.MYSQL_PASSWORD
    default:
    break;
  }
}

module.exports = env