const mongoose = require('mongoose');
const meseroSchema = new mongoose.Schema({
    nombre: String,
    ape_paterno: String,
    ape_materno: String,
    telefono: String,
    dni: String,
    estado: String,
});

module.exports = mongoose.model('Mesero', meseroSchema);
