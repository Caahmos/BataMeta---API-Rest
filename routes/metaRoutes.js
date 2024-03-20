const express = require('express');
const route = express.Router();
const MetaController = require('../src/controllers/metacontroller');
const verificarToken = require('../src/helpers/verificarToken')

route.post('/registrar', verificarToken, MetaController.registrar);
route.get('/minhasmetas', verificarToken, MetaController.buscarMetasporId);
route.get('/:id', verificarToken, MetaController.buscarMetaporId);
route.patch('/atualizar/:id', verificarToken, MetaController.atualizarMeta);

module.exports = route;