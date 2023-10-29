
const db = require('../models');
const Web_api_backend = db.web_api_model;

exports.findAll = (req, res) => {

    Web_api_backend.find();

};

exports.findOne = (req, res) => {

    Web_api_backend.findOne();
    
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