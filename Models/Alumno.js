const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let alumnoSchema = new Schema({
    nombre: String,
    apellidos: String,
    numTelefono: String,
    correoElectronico: String,
    notaMedia: Number,
    /*empresaAsignada: String,*/
    empresaAsignada: {type: Schema.ObjectId, ref: 'Empresa'},
    direccion: String,
    foto: String
});



module.exports =
    mongoose.model('Alumno', alumnoSchema);