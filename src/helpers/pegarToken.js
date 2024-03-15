const jwt = require('jsonwebtoken');

function pegarToken(req){
    const auth = req.headers.authorization;

    const token = auth.split(' ')[1]

    return token;
}

module.exports = pegarToken;