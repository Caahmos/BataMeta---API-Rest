const express = require('express');
const route = express.Router();
const MetaController = require('../src/controllers/metacontroller');
const verificarToken = require('../src/helpers/verificarToken')

route.post('/registrar', verificarToken, MetaController.registrar);
route.post('/adicionarvalor/:id', verificarToken, MetaController.adicionarValor);
route.post('/retirarvalor/:id', verificarToken, MetaController.retirarValor);

route.get('/minhasmetas', verificarToken, MetaController.buscarMetasporId);
route.get('/:id', verificarToken, MetaController.buscarMetaporId);

route.patch('/atualizar/:id', verificarToken, MetaController.atualizarMeta);
route.delete('/apagar/:id', verificarToken, MetaController.deletar);

module.exports = route;