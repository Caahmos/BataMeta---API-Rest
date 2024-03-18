const MetaModel = require('../models/Meta');
const pegarToken = require('../helpers/pegarToken');
const pegarUserPorToken = require('../helpers/pegarUserPorToken');

module.exports = class MetaController {
    static async registrar(req, res) {
        try {
            const { nome, valorMeta, prazoMeta, valorAtual } = req.body;

            if (!nome) return res.status(422).json({ message: 'O campo nome não pode estar vazio!' });
            if (!valorMeta) return res.status(422).json({ message: 'O campo de valor da meta não pode estar vazio!' });
            if (!prazoMeta) return res.status(422).json({ message: 'O campo de prazo da meta não pode estar vazio!' });

            const token = pegarToken(req);
            const user = await pegarUserPorToken(token);

            const nomeExiste = await MetaModel.find({ $and: [{ nome: nome }, { 'user._id': user._id }] });
            if (nomeExiste) return res.status(422).json({ message: 'Já existe uma meta com esse nome!' });

            const meta = new MetaModel({
                nome,
                valorMeta,
                prazoMeta,
                valorAtual,
                user: {
                    _id: user._id,
                    nome: user.nome,
                }
            });

            const novaMeta = await meta.save();

            res.status(201).json({ message: 'Meta registrada com sucesso!', novaMeta });
        } catch (err) {
            res.status(422).json({ message: 'Erro ao registrar meta!' });
            console.log(err);
        }
    }

    static async buscarMetasporId(req, res) {
        try {
            const token = pegarToken(req);
            const user = await pegarUserPorToken(token);

            const metas = await MetaModel.find({ 'user._id': user._id });
            if (!metas) return res.status(422).json({ message: 'Nenhuma meta encontrada!' });

            res.status(200).json({ message: 'Metas encontradas com sucesso!', metas });
        } catch (err) {
            res.status(422).json({ message: 'Erro ao buscar metas' });
            console.log(err);
        }
    }

    static async buscarMetaporId(req, res) {
        try {
            const token = pegarToken(req);
            const user = await pegarUserPorToken(token);

            const meta = await MetaModel.findById(req.params.idMeta);
            if (!meta) return res.status(422).json({ message: 'Nenhuma meta encontrada!' });

            res.status(200).json({ message: 'Meta encontrada com sucesso!', meta });
        } catch (err) {
            res.status(422).json({ message: 'Erro ao buscar meta' });
            console.log(err);
        }
    }
}