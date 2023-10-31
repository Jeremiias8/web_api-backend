
module.exports = app => {

    const modelos = require('../controllers/web_api-controller');

    let router = require('express').Router();

    // nuevo modelo
    router.post('/', modelos.create);

    // retornar modelos
    router.get('/', modelos.findAll);

    // retornar modelos con published: true
    router.get('/published', modelos.findAllPublished);

    // retornar un modelo con id
    router.get('/:id', modelos.findOne);

    // actualizar modelo con id
    router.put('/:id', modelos.update);

    // borrar modelo con id
    router.delete('/:id', modelos.delete);

    // borrar todos los modelos
    router.delete('/', modelos.deleteAll);

    app.use('/api/modelos', router);
    
}