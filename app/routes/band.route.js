'use strict'
const { getBand } = require('../controllers/band.controller')
const { validateGetBand } = require('../middlewares/band.middleware')
const passport = require('../config/passport')
module.exports = function (app, apiVersion) {
  const route = apiVersion

  app.get(route + '/band', passport.authenticate('jwt', { session: false }), validateGetBand, getBand)
}
