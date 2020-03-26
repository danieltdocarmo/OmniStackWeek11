
const express = require('express')

const IncidentControler = require('./controllers/IncidentController.js')
const OngController = require('./controllers/OngController.js')
const ProfileController = require('./controllers/ProfileController')
const SessionController = require('./controllers/SessionController')


const routes = express.Router();

routes.get('/ongs', OngController.index)

routes.post('/ongs', OngController.create)

routes.get('/incident', IncidentControler.index)

routes.post('/incident', IncidentControler.create)

routes.delete('/incident/:id', IncidentControler.delete)

routes.get('/profile', ProfileController.index)

routes.post('/session', SessionController.create)

module.exports = routes;