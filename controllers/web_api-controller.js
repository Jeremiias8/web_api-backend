
const db = require('../models');
const Web_api_backend = db.web_api_model;

exports.create = (req, res) => {

    // validando petición
    if (!req.body.title) {
        res.status(400).send({
            message: "Content can't' be empty!"
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
                    err.message || "Ocurrió un error mientras se creaba el modelo."
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
                    err.message || "Ocurrió un error mientras se devolvian los modelos."
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

    if (!req.body) {
        return res.status(400).send({
            message: "Los datos requeridos para actualizar no fueron encontrados..."
        });
    }

    const id = req.params.id;

    Web_api_backend.findByIdAndUpdate(id)
        .then(data => {
            if (!data)
                res.status(404).send({
                    message: `No se pudo actualizar ningún modelo con id = ${id}. Quizá el modelo no fuera encontrado`
                });
            else res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error al actualizar el modelo con id = " + id
            });
        });
    
};

exports.delete = (req, res) => {

    const id = req.params.id;

    Web_api_backend.findByIdAndRemove(id)
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `No se ha podido eliminar el model con id = ${id}. Quizás el modelo no fue encontrado`
                });
            } else {
                res.send({
                    message: "Modelo Eliminado Correctamente!"
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Puede que no se haya eliminado el model con id = " + id
            });
        });
};

exports.deleteAll = (req, res) => {

    Web_api_backend.deleteMany({})
        .then(data => {
            res.send({
                message: `${data.deletedCount} Los modelos fueron eliminados exitosamente !`
            });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Algún error ocurrió mientras se removian los modelos"
            });
        });
    
};

exports.findAllPublished = (req, res) => {

    Web_api_backend.find({ published: true })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Un error ocurrió mientras se devolvían los modelos."
            });
        });
    
};