const jsonwebtoken = require('jsonwebtoken');
require('dotenv').config();

function gerarToken(user, res){
    const token = jsonwebtoken.sign({
        id: user._id,
        nome: user.nome
    }, process.env.SECRET);

    return res.status(200).json({ message: "Usuário entrou com sucesso!", token, user: {
        id: user._id,
        nome: user.nome,
        email: user.email
    } });
};

module.exports = gerarToken;