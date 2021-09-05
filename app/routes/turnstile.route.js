'use strict'
const passport = require('../config/passport')

const { 
     createTurnstile,
     getTurnstile, 
     deleteTurnstile, 
     updateTurnstile } = require('../controllers/turnstile.controller')

const { 
     validateCreateTurnstile,
     validateGetTurnstile, 
     validateDeleteTurnstile, 
     validateUpdateTurnstile } = require('../middlewares/turnstile.Middleware')

    module.exports = function (app, apiVersion) {
    const route = apiVersion
    app.post(route + '/turnstile', passport.authenticate('jwt', { session: false }), validateCreateTurnstile, createTurnstile)
    app.get(route + '/turnstile', passport.authenticate('jwt', { session: false }), validateGetTurnstile, getTurnstile)
    app.delete(route + '/turnstile/:id', passport.authenticate('jwt', { session: false }), validateDeleteTurnstile, deleteTurnstile)
    app.put(route + '/turnstile/:id', passport.authenticate('jwt', { session: false }), validateUpdateTurnstile, updateTurnstile)
  }
