const jwt = require('jsonwebtoken');
const pegarToken = require('./pegarToken');

function verificarToken(req, res, next) {
    if (!req.headers.authorization) res.status(401).json({ message: 'Acesso negado!' });

    const token = pegarToken(req);

    if (!token) res.status(401).json({ message: 'Acesso negado!' });

    try {
        const tokenValido = jwt.verify(token, 'supersegredosecreto123');
        req.user = tokenValido;
        next();
    } catch (err) {
        res.status(401).json({ message: 'Token inválido!' });
    }

}

module.exports = verificarToken;