'use strict'

var validator = require('validator');
var Article = require('../models/articleModel');
var controller = {
    datosCurso: (request, response) => {
        var hola = request.body.hola;
    
        return response.status(200).send({
            curso: "Master en Framework-JS",
            Autor: "Alejandro",
            Apellido: 'Cabeza',
            hola
        })
    },

    test: (request, response) => {
        return response.status(200).send({
            message: 'Soy la acción test de mi controlador de articulos'
        });
    },

    save: (request, response) => {
        //Recoger parametros por post
        var params = request.body;
        //Validar datos (validator)
        try {
            var validate_title = !validator.isEmpty(params.title);
            var validate_content = !validator.isEmpty(params.content);

        }catch(err) {
            return response.status(200).send({
                status: 'error',
                message: 'Faltan datos por enviar'
            })
        }
        //Crear el objeto a guardar

        var article = new Article();

        //Asignar valores
        article.title = params.title;
        article.content = params.content;
        article.image = null;
        //Guardar Articulo

        if (validate_title && validate_content) {

        article.save((err, articleStored) => {
            if (err || !articleStored) {
                return response.status(404).send({
                    status: 'error',
                    message: 'El articulo no se ha guardado!!'
                })
            }

            //Devolver respuesta
            return response.status(200).send({
                status: 'success',
                message: articleStored
            })
        })

        } else {
            return response.status(200).send({
                message: 'Los datos no son validos'
            })
        }   
    },
    getArticles: (req, res) => {
        //Find
        Article.find({}).sort('-_id').exec((err, articles) => {
            if (err) {
                return res.status(500).send({
                    status: 'error',
                    message: 'Error al devolver los articulos !!!'
                });
            }

            if (!articles) {
                return res.status(404).send({
                    status: 'error',
                    message: 'No hay artículos para mostrar !!!'
                });
            }
            return res.status(200).send({
                status: 'success',
                articles
            });
        });
    },
    getArticles: (req, res) => {

        var query = Article.find({})

        var last = req.params.last;
        if (last || last != undefined) {
            query.limit(2);
        }
        //Find
        query.sort('-_id').exec((err, articles) => {
            if (err) {
                return res.status(500).send({
                    status: 'error',
                    message: 'Error al devolver los articulos !!!'
                });
            }

            if (!articles) {
                return res.status(404).send({
                    status: 'error',
                    message: 'No hay artículos para mostrar !!!'
                });
            }
            return res.status(200).send({
                status: 'success',
                articles
            });
        });
    },
    getArticle: (req, res) => {

        //Recoger el id de la url
        var articleId = req.params.id;
        //Comprobar que existe
        if (!articleId || articleId == null) {
            return res.status(404).send({
                status: 'error',
                message: 'No se ha encontrado artículo!!'
            })
        }
        //Buscar el artículo
        Article.findById(articleId, (err, article) => {
            if(err || !article) {
                return res.status(404).send({
                    status: 'error',
                    message: 'No existe el artículo!!'
                })
            }
            //Devolverlo en json
            return res.status(200).send({
                status: 'success',
                article
            });
        })
    }
}; // end controller

module.exports = controller;