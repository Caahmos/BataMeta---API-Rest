const UserModel = require('../models/User');
const bcrypt = require('bcryptjs');
const gerarToken = require('../helpers/gerarToken');
const pegarToken = require('../helpers/pegarToken');
const pegarUserPorToken = require('../helpers/pegarUserPorToken');

module.exports = class UserController {
    static async registrar(req, res) {
        try {
            const { nome, sobrenome, email, senha, confirmarSenha } = req.body;

            if (!nome || '') return res.status(422).json({ message: "O campo nome não pode estar vazio!" });
            if (!sobrenome || '') return res.status(422).json({ message: "O campo sobrenome não pode estar vazio!" });
            if (!email || '') return res.status(422).json({ message: "O campo email não pode estar vazio!" });
            if (!senha || '') return res.status(422).json({ message: "O campo senha não pode estar vazio!" });
            if (!confirmarSenha || '') return res.status(422).json({ message: "O campo confirmar senha não pode estar vazio!" });
            if (senha != confirmarSenha) return res.status(422).json({ message: "As senhas devem ser iguais!" });

            const salt = bcrypt.genSaltSync(10);
            const senhaHash = bcrypt.hashSync(senha, salt);

            const emailExiste = await UserModel.find({ email: email });
            if (emailExiste) return res.status(422).json({ message: "Usuário com esse nome já existe!" });

            const user = await UserModel.create({
                nome,
                sobrenome,
                email,
                senha: senhaHash
            });

            gerarToken(user, res);

        } catch (err) {
            res.status(422).json({ message: 'Erro ao cadastrar usuário!' });
            console.log(err);
        };
    };

    static async entrar(req, res) {
        try {
            const { email, senha } = req.body;

            if (!email || '') return res.status(422).json({ message: "O campo email não pode estar vazio!" });
            if (!senha || '') return res.status(422).json({ message: "O campo senha não pode estar vazio!" });

            const user = await UserModel.findOne({ email: email });
            if (!user) return res.status(422).json({ message: "Email ou senha incorretos!" });

            const senhaCorreta = bcrypt.compareSync(senha, user.senha);

            if (!senhaCorreta) return res.status(422).json({ message: "Email ou senha incorretos!" });

            gerarToken(user, res);
        } catch (err) {
            res.status(422).json({ message: 'Erro ao entrar!' });
            console.log(err);
        }
    }

    static async atualizar(req, res) {
        try {
            const { nome, sobrenome, email, senha, confirmarSenha } = req.body;
            const token = pegarToken(req);
            const user = await pegarUserPorToken(token);

            if (req.file) {
                user.img = req.file.filename;
            }

            if (!nome || '') return res.status(422).json({ message: "O campo nome não pode estar vazio!" });
            user.nome = nome;
            if (!sobrenome || '') return res.status(422).json({ message: "O campo sobrenome não pode estar vazio!" });
            user.sobrenome = sobrenome;
            if (!email || '') return res.status(422).json({ message: "O campo email não pode estar vazio!" });
            user.email = email;
            if (!senha || '') return res.status(422).json({ message: "O campo senha não pode estar vazio!" });
            if (!confirmarSenha || '') return res.status(422).json({ message: "O campo confirmar senha não pode estar vazio!" });
            if (senha != confirmarSenha) return res.status(422).json({ message: "As senhas devem ser iguais!" });

            const salt = bcrypt.genSaltSync(10);
            const senhaHash = bcrypt.hashSync(senha, salt);
            user.senha = senhaHash;

            const emailExiste = await UserModel.findOne({ email: email });
            if (emailExiste) return res.status(422).json({ message: "Usuário com esse email já existe!" });

            const userAtualizado = await UserModel.findByIdAndUpdate(user._id, user);
            res.status(201).json({ message: 'Usuário atualizado com sucesso!' });
        }catch(err){
            console.log(err);
            res.status(422).json({ message: 'Usuário não encontrado' });
        }
    }
};