const mongoose = require('mongoose');
const metaSchema = new mongoose.Schema({
    nome: {
        type: String,
        required: true,
        allowNull: false
    },
    valorMeta: {
        type: Number,
        required: true,
        allowNull: false
    },
    prazoMeta: {
        type: Date,
        required: true,
        allowNull: false 
    },
    valorAtual: {
        type: Number,
        required: false,
        allowNull: true
    },
    user: Object
}, { timestamps: true })

const MetaModel = mongoose.model('Meta', metaSchema);

module.exports = MetaModel;