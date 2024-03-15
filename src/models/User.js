const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    nome: {
        type: String,
        allowNull: false,
        required: true
    },
    sobrenome: {
        type: String,
        allowNull: false,
        required: true
    },
    email: {
        type: String,
        allowNull: false,
        required: true
    },
    senha: {
        type: String,
        allowNull: false,
        required: true
    },
    img: {
        type: String,
        allowNull: false,
        required: false
    }
}, { timestamps: true })

const UserModel = mongoose.model('User', userSchema);

module.exports = UserModel;