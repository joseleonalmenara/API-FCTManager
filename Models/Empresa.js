const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let empresaSchema = new Schema({
    nombre: {type: String, unique: true},
    numTelefono: String,
    direccion: String,
    correoElectronico: String,
    latLng: String,
    nombreTutorLaboral: String,
    emailTutorLaboral: String
    /*autor: {type: Schema.ObjectId, ref: 'User'}*/
});

let Empresa = mongoose.model('Empresa', empresaSchema);

let e1 = new Empresa({
    nombre: "Sin asignar"
});

e1.save(function (err){
    if(err){
        console.log(err);
    }

});



module.exports =
    mongoose.model('Empresa', empresaSchema);