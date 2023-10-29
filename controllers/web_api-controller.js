
const db = require('../models');
const Web_api_backend = db.web_api_model;

exports.create = (req, res) => {

    // validando petición
    if (!req.body.title) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    // creando modelo
    const webApiBackend = new Web_api_backend({
        type: req.body.type,
        description: req.body.description,
        published: req.body.published ? req.body.published : false
    });

    // guardándolo en la BBDD
    webApiBackend   
        .save(webApiBackend)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Algún error ocurrió mientras se creaba el modelo."
            });
        });
};

exports.findAll = (req, res) => {

    const type = req.body.type;
    let condition = type ? { title: { $regex: new RegExp(type), $options: "i" } } : {};

    Web_api_backend.find(condition)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Algún error ocurrió mientras se devolvían los modelos."
            });
        });
};

exports.findOne = (req, res) => {

    const id = req.params.id;

    Web_api_backend.findById(id)
        .then(data => {
            if (!data) 
                res.status(404).send({
                    message: "Modelo con id no encontrado " + id
                });
            else res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error al devolver un modelo con id = " + id
            });
        });
    
};

exports.update = (req, res) => {

    Web_api_backend.findByIdAndUpdate();
    
};

exports.delete = (req, res) => {

    Web_api_backend.findByIdAndRemove();
    
};

exports.deleteAll = (req, res) => {

    Web_api_backend.remove();
    
};

exports.findAllPublished = (req, res) => {

    Web_api_backend.findAll();
    
};