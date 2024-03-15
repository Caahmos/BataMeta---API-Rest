const jsonwebtoken = require('jsonwebtoken');

function gerarToken(user, res){
    const token = jsonwebtoken.sign({
        id: user._id,
        nome: user.nome
    }, 'supersegredosecreto123');

    return res.status(200).json({ message: "Usuário registrado com sucesso!", token, user: {
        id: user._id,
        nome: user.nome,
        email: user.email
    } });
};

module.exports = gerarToken;