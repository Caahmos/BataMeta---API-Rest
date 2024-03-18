const express = require('express');
const route = express.Router();
const MetaController = require('../src/controllers/metacontroller');
const verificarToken = require('../src/helpers/verificarToken')

route.post('/registrar', verificarToken, MetaController.registrar);
route.get('/:idUser', verificarToken, MetaController.buscarMetasporId);
route.get('/:idUser/:idMeta', verificarToken, MetaController.buscarMetaporId);

module.exports = route;