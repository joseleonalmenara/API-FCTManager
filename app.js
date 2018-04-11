const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const logger =  require('morgan'); // Para realizar el logging de la aplicación
const mongoose = require('mongoose');
const auth = require('./middlewares/auth');
const config = require('./config');
const cors = require('cors');


mongoose.connect(config.MONGODB_URI,
    /*{ useMongoClient: true }*/);
mongoose.Promise = global.Promise;
//

// Requerimos todos los routes
const alumnos = require('./routes/alumnos');
const profesores = require('./routes/profesores');
const empresas = require('./routes/empresas');

let app = express();

app.use(cors());
app.use(logger('dev')); // Para "inicializar" el logging
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/api/v1/auth', profesores, function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use('/api/v1/auth', alumnos);
//app.use('/api/v1/auth', profesores);
app.use('/api/v1/auth', empresas);
/*app.use('/api/v1/notas', auth.isAuth, notas);*/

module.exports = app;