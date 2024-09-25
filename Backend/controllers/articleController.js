'use strict'

var validator = require('validator');
var Article = require('../models/articleModel');
var fs = require('fs');
var path = require('path');
const { exists } = require('../models/articleModel');
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

        } catch (err) {
            return response.status(200).send({
                status: 'error',
                message: 'Faltan datos por enviar'
            })
        }
        //Crear el objeto a guardar

        var article = new Article();

        //Asignar valores
        article.title = params.title ? params.title : null;
        article.content = params.content ? params.content : null;
        article.image = params.image ? params.image : null;
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
            if (err || !article) {
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
        });
    },
    update: (req, res) => {
        //Recoger el id del articulo por la url
        var articleId = req.params.id;
        //Recoger los datos que llegan por put
        var params = req.body;
        //Validar datos
        try {
            var validate_title = !validator.isEmpty(params.title);
            var validate_content = !validator.isEmpty(params.content);
        } catch (err) {
            return res.status(200).send({
                status: 'error',
                message: 'Faltan datos por validar'
            })
        }
        if (validate_content && validate_title) {
            //Find and update
            Article.findOneAndUpdate({ _id: articleId }, params, { new: true }, (err, articleUpdated) => {
                if (err) {
                    return res.status(500).send({
                        status: 'error',
                        message: 'Error al actualizar !!!'
                    });
                }
                if (!articleUpdated) {
                    return res.status(404).send({
                        status: 'error',
                        message: 'No existe ningún articulo !!!'
                    });
                }

                return res.status(200).send({
                    status: 'success',
                    article: articleUpdated
                });
            })
        } else {
            return res.status(200).send({
                status: 'error',
                message: 'La validación no es correcta!!!'
            })
        }
    },
    delete: (req, res) => {
        //Recoger el id del articulo por la url
        var articleId = req.params.id;
        //Find and delete
        Article.findOneAndDelete({ _id: articleId }, (err, articleRemove) => {
            if (err) {
                return res.status(500).send({
                    status: 'error',
                    message: 'Error al eliminar !!!'
                });
            }
            if (!articleRemove) {
                return res.status(404).send({
                    status: 'error',
                    message: 'No existe ningún articulo !!!'
                });
            }

            return res.status(200).send({
                status: 'success',
                article: articleRemove
            });
        });
    },
    upload: (req, res) => {
        //Configurar el modulo connect multiparty router/article.js

        //Recoger el fichero de la petición 
        var file_name = 'Imagen no subida...';

        if (!req.files) {
            return res.status(404).send({
                status: 'error',
                message: file_name
            });
        }
        //Conseguir el nombre y la extensión del archivo
        var file_path = req.files.file0.path;
        var file_split = file_path.split('\\');

        // * ADVERTENCIA * EN LUNUX O MAC
        // var file_split = file_path.split('\');

        //Nombre del archivo
        var file_name = file_split[2];

        //Extensión del fichero
        var extension_split = file_name.split('\.');
        var file_ext = extension_split[1];
        //Comprobar la extension, solo imagenes, si es invalido borrar el fichero
        if (file_ext != 'png' && file_ext != 'jpg' && file_ext != 'jpeg' && file_ext != 'gif') {
            // borrar el archivo subido
            fs.unlink(file_path, (err => {
                return res.status(200).send({
                    status: 'error',
                    nessage: 'La extensión de la imagen no es valida'
                })
            }))
        } else {
            //Si todo es valido, sacamos id del artículo
            var articleId = req.params.id;
            if (articleId) {
                //Buscar el articulo, asignarle el nombre de la imagen y actualizarlo
                Article.findOneAndUpdate({ _id: articleId }, { image: file_name }, { new: true }, (err, articleUpdated) => {
                    if (err || !articleUpdated) {
                        return res.status(200).send({
                            status: 'error',
                            message: 'error al guardar la imagen del artículo'
                        });
                    }

                    return res.status(200).send({
                        status: 'success',
                        article: articleUpdated
                    });
                })
            } else {
                return res.status(200).send({
                    status: 'success',
                    image: file_name
                });
            }
        }
    },

    getImage: (req, res) => {
        var file = req.params.image;
        var path_file = './upload/articles/' + file;
        fs.exists(path_file, (exists) => {
            if (exists) {
                return res.sendFile(path.resolve(path_file));
            } else {
                return res.status(404).send({
                    status: 'success',
                    message: 'La imagen no existe'
                });
            }
        });
    },

    search: (req, res) => {
        //Sacar el string a buscar
        var search_string = req.params.search;
        //Find or
        Article.find({
            "$or": [
                { "title": { "$regex": search_string, "$options": "i" } },
                { "content": { "$regex": search_string, "$options": "i" } }
            ]
        }).sort([['date', 'descending']])
            .exec((err, articles) => {
                if (err) {
                    return res.status(500).send({
                        status: 'error',
                        message: 'Error en la petición !!'
                    })
                }

                if (!articles || articles.length <= 0) {
                    return res.status(404).send({
                        status: 'error',
                        message: 'No hay artículos que coincidan con tu busquedad !!'
                    })
                }
                return res.status(200).send({
                    status: 'success',
                    articles
                })
            })
    }
}; // end controller

module.exports = controller;