const jwt = require('jsonwebtoken');
const UserModel = require('../models/User');
require('dotenv').config();

async function pegarUserPorToken(token) {
    try {
        if (!token) res.status(401).json({ message: 'Acesso negado!' });

        const verificarToken = jwt.verify(token, process.env.SECRET);
        const userId = verificarToken.id;

        const user = await UserModel.findOne({ _id: userId });

        return user;
    }catch(err){
        console.log(err);
    }
}

module.exports = pegarUserPorToken;