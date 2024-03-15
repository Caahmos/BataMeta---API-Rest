const express = require('express');
const route = express.Router();
const UserController = require('../src/controllers/usercontroller');
const verificarToken = require('../src/helpers/verificarToken');
const { imageUpload } = require('../src/helpers/imageUpload');

route.post('/registrar', UserController.registrar);
route.post('/entrar', UserController.entrar);
route.patch('/atualizar/:id', verificarToken, imageUpload.single('image'), UserController.atualizar);

module.exports = route;