require('dotenv').config();
const mongoose = require('mongoose');

const conn = mongoose.connect(process.env.CONNECTIONSTRING)
    .then(response => {
        console.log('Conectado com sucesso!')
    })
    .catch(err => {
        console.log(err);
        console.log('Conexão recusada!');
    })

module.exports = conn;