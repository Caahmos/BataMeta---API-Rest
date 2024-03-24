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

            const nomeExiste = await MetaModel.findOne({ $and: [{ nome: nome }, { 'user._id': user._id }] });
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

            const meta = await MetaModel.findOne({ $and: [{ 'user._id': user._id }, { _id: req.params.id }]});
            if (!meta) return res.status(422).json({ message: 'Nenhuma meta encontrada!' });

            res.status(200).json({ message: 'Meta encontrada com sucesso!', meta });
        } catch (err) {
            res.status(422).json({ message: 'Erro ao buscar meta' });
            console.log(err);
        }
    }

    static async atualizarMeta(req, res) {
        try {
            const token = pegarToken(req);
            const user = await pegarUserPorToken(token);
            const { nome, valorMeta, prazoMeta, valorAtual } = req.body;

            const meta = await MetaModel.findById(req.params.id);

            if (!nome && !valorMeta && !prazoMeta && !valorAtual) return res.status(422).json({ message: 'Nada para atualizar!' });

            if (nome) {
                const nomeExiste = await MetaModel.findOne({ $and: [{ nome: nome }, { 'user._id': user._id }] });
                if (nomeExiste) return res.status(422).json({ message: 'Já existe uma meta com esse nome!' });
                meta.nome = nome
            };
            if (valorMeta) {
                meta.valorMeta = valorMeta
            };
            if (prazoMeta) {
                umetaser.prazoMeta = prazoMeta
            };
            if (valorAtual) {
                meta.valorAtual = valorAtual
            };

            if (meta.user._id.toString() !== user._id.toString()) return res.status(422).json({ message: 'O usuário não é dono dessa meta!' });

            const metaAtualizada = await MetaModel.findByIdAndUpdate(req.params.id, meta);
            res.status(201).json({ message: 'A meta foi atualizado!' });
        } catch (err) {
            console.log(err);
            res.status(422).json({ message: 'A meta não foi atualizado!' });
        }
    }

    static async adicionarValor(req, res) {
        try {
            let { valorNovo } = req.body;

            if (!valorNovo) return res.status(422).json({ message: 'Nada para atualizar!' })

            const token = pegarToken(req);
            const user = await pegarUserPorToken(token);

            const meta = await MetaModel.findById(req.params.id);
            if (meta.user._id.toString() !== user._id.toString()) return res.status(422).json({ message: 'O usuário não é dono dessa meta!' });

            const valorAtual = Number(meta.valorAtual);
            const valorMeta = Number(meta.valorMeta);

            valorNovo = valorAtual + Number(valorNovo);

            if (valorNovo > valorMeta) {
                valorNovo = valorMeta;
            };

            const valorAtualizado = await MetaModel.findByIdAndUpdate(meta._id, { valorAtual: valorNovo });
            res.status(200).json({ message: 'Valor atualizado com sucesso!' })
        } catch (err) {
            res.status(422).json({ message: 'Valor não foi atualizado!' })
        }
    }

    static async retirarValor(req, res) {
        try {
            let { valorNovo } = req.body;

            if (!valorNovo) return res.status(422).json({ message: 'Nada para atualizar!' })

            const token = pegarToken(req);
            const user = await pegarUserPorToken(token);

            const meta = await MetaModel.findById(req.params.id);
            if (meta.user._id.toString() !== user._id.toString()) return res.status(422).json({ message: 'O usuário não é dono dessa meta!' });

            const valorAtual = Number(meta.valorAtual);

            valorNovo = valorAtual - Number(valorNovo);

            if (valorNovo <= 0) {
                valorNovo = 0;
            };

            const valorAtualizado = await MetaModel.findByIdAndUpdate(meta._id, { valorAtual: valorNovo });
            res.status(200).json({ message: 'Valor atualizado com sucesso!' })
        } catch (err) {
            res.status(422).json({ message: 'Valor não foi atualizado!' })
        }
    }

    static async deletar(req, res) {
        try {
            const token = pegarToken(req);
            const user = await pegarUserPorToken(token);

            const meta = await MetaModel.findById(req.params.id);

            if (meta.user._id.toString() !== user._id.toString()) return res.status(422).json({ message: 'O usuário não é dono dessa meta!' });

            await MetaModel.findByIdAndDelete(req.params.id);
            res.status(200).json({ message: 'A meta foi excluída com sucesso!' });
        } catch (err) {
            console.log(err);
            res.status(422).json({ message: 'A meta não foi excluída!' });
        }
    }
}