const { Router } = require('express');
const AgendaController = require('./controllers/agendaController');
const servicoController = require('./controllers/servicoController');

const routes = Router();

 routes.get('/agenda', AgendaController.index)
 routes.get('/servico', servicoController.index)
 routes.get('/agenda/:id', AgendaController.show)
 routes.post('/agenda', AgendaController.create)
 routes.put('/agenda', AgendaController.update)
 routes.delete('/agenda', AgendaController.destroy)
 routes.get('/bananinha', AgendaController.index)



module.exports = routes