'use strict'

// Get dependencies
const express = require('express')
const http = require('http')
const passport = require('./app/config/passport')
const app = express()

// Middleware to capture any HTTP responses

app.get('/api/v1/public/health', function (req, res) {
  return res.status(200).send('Public micro-service working 100%... \n 29 March, 2020 - 3:00 AM')
})
global.winston = require('./app/config/winston')
// Initialize Express
require('./app/config/express')(app, passport)

// Initializing sequelize
require('./app/config/sequelize.config')

/**
 * Get port from environment and store in Express.
 */
const port = process.env.PORT || '3100'

app.set('port', port)

/**
 * Create HTTP server.
 */

const server = http.createServer(app)

/**
 * Listen on provided port, on all network interfaces.
 */
console.log('Going to listen on port:', port)
server.listen(port, () => console.log(`API running on localhost:${port}`)).on('error', (error) => {
  console.log(error)
})
console.log('After listen on port:', port)

module.exports = app
