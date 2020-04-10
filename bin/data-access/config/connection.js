require('dotenv').config();
let host = process.env['DATABASE_HOST']
let database = process.env['DATABASE_NAME'];
let port = process.env['DATABASE_PORT'];
let user = process.env['DATABASE_USER'];
let password = process.env['DATABASE_PASSWORD'];
let ssl = process.env['DATABASE_SSL']
module.exports = {
    host, database, port, user, password, ssl
}