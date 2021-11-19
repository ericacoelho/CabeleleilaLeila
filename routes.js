const { Router } = require('express');
const AgendaController = require('./controllers/agendaController');
const comandaController = require('./controllers/comandaController');
const planoUsuarioController = require('./controllers/planoUsuarioController');
const servicoController = require('./controllers/servicoController');
const telefoneUsuarioController = require('./controllers/telefoneUsuarioController');
const UsuarioControler = require('./controllers/usuarioController');

const routes = Router();

 routes.get('/servico', servicoController.index)
 routes.get('/servico/:id', servicoController.show)
 routes.post('/servico', servicoController.create)
 routes.put('/servico', servicoController.update)
 routes.delete('/servico', servicoController.destroy)

 routes.get('/agenda', AgendaController.index)
 routes.get('/agenda/:id', AgendaController.show)
 routes.post('/agenda', AgendaController.create)
 routes.put('/agenda', AgendaController.update)
 routes.delete('/agenda', AgendaController.destroy)

 routes.get('/usuario', UsuarioControler.index)
 routes.post('/usuario', UsuarioControler.create)
 routes.get('/usuario/:id', UsuarioControler.show)
 routes.put('/usuario', UsuarioControler.update)
 routes.delete('/usuario', UsuarioControler.destroy)

 routes.get('/plano-usuario', planoUsuarioController.index)
 routes.post('/plano-usuario', planoUsuarioController.create)
 routes.get('/plano-usuario/:id', planoUsuarioController.show)
 routes.put('/plano-usuario', planoUsuarioController.update)
 routes.delete('/plano-usuario/:id', planoUsuarioController.destroy)

 routes.get('/telefone-usuario', telefoneUsuarioController.index)
 routes.post('/telefone-usuario', telefoneUsuarioController.create)
 routes.get('/telefone-usuario/:id', telefoneUsuarioController.show)
 routes.put('/telefone-usuario', telefoneUsuarioController.update)
 routes.delete('/telefone-usuario/:id', telefoneUsuarioController.destroy)

 routes.get('/comanda', comandaController.index)
 routes.post('/comanda', comandaController.create)
 routes.get('/comanda/:id', comandaController.show)
 routes.put('/comanda', comandaController.update)
 routes.delete('/comanda/:id', comandaController.destroy)



module.exports = routes