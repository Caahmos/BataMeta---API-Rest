const express = require('express');
const app = express();
const conn = require('./conn/conn');
const userRoutes = require('./routes/userRoutes');
const metaRoutes = require('./routes/metaRoutes');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/user',  userRoutes);
app.use('/meta', metaRoutes);

app.listen(5000, () => {
    console.log('O servidor está rodando!');
    console.log('http://localhost:5000');
});