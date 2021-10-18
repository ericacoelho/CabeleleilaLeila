const { Router } = require('express');
const AgendaController = require('./controllers/agendaController');

const routes = Router();

 routes.get('/agenda', AgendaController.index)
 routes.get('/agenda/:id', AgendaController.show)
 routes.post('/agenda', AgendaController.create)
 routes.put('/agenda', AgendaController.update)


module.exports = routes