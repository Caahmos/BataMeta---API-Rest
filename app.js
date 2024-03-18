const express = require('express');
const app = express();
const conn = require('./conn/conn');
const userRoutes = require('./routes/userRoutes');
const metaRoutes = require('./routes/metaRoutes');
const path = require('node:path');
const cors = require('cors');

app.use(express.json());
app.use(cors({ credentials: true, origin: 'http://localhost:3000'}));
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.resolve(__dirname, 'public')));

app.use('/user',  userRoutes);
app.use('/metas', metaRoutes);

app.listen(5000, () => {
    console.log('O servidor está rodando!');
    console.log('http://localhost:5000');
});