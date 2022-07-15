'use strict'

// Cargar modules de node para crear servidor
var express = require('express');
var bodyParser = require('body-parser');
// Ejecutar express (http)
var app = express();
// Cargar ficheros rutas

var article_routes = require('./routes/articleRoutes');

// MiddLewares
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

// CORS Acesso cruzado entre dominios

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

// Añadir prefijos a rutas / cargar rutas

app.use('/api', article_routes);

// Ruta o metodo de prueba para el API REST
/*app.post('/datos-curso', (request, response) => {
    var hola = request.body.hola;

    return response.status(200).send({
        curso: "Master en Framework-JS",
        Autor: "Alejandro",
        Apellido: 'Cabeza',
        hola
    })
})*/




// Exportar modulo (fichero actual)
module.exports = app;
