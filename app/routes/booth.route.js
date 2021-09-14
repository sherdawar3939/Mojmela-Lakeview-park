'use strict'
const passport = require('../config/passport')
const { 
     createBooth,
     getBooth, 
     deleteBooth, 
     updateBooth } = require('../controllers/booth.controller')

const { 
     validateCreateBooth,
     validateGetBooth, 
     validateDeleteBooth, 
     validateUpdateBooth } = require('../middlewares/booth.middlewar')

    module.exports = function (app, apiVersion) {
    const route = apiVersion
    app.post(route + '/booth', passport.authenticate('jwt', { session: false }), validateCreateBooth, createBooth)
    app.get(route + '/booth', passport.authenticate('jwt', { session: false }), validateGetBooth, getBooth)
    app.delete(route + '/booth/:id', passport.authenticate('jwt', { session: false }), validateDeleteBooth, deleteBooth)
    app.put(route + '/booth/:id', passport.authenticate('jwt', { session: false }), validateUpdateBooth, updateBooth)
  }
