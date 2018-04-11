const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');
const crypto = require('crypto');

let profesorSchema = new Schema({
    nombre: String,
    apellidos: String,
    numTelefono: String,
    correoElectronico: String,
    password: {type: String, select: false},
    avatar: String
    /*autor: {type: Schema.ObjectId, ref: 'User'}*/
});

profesorSchema.pre('save', function (next) {

    let profesor = this;

    if (profesor.isModified('correoElectronico')) {
        const md5 = crypto
            .createHash('md5')
            .update(profesor.correoElectronico)
            .digest('hex');
        profesor.avatar = `https://gravatar.com/avatar/${md5}?s=200&d=retro`
    }

    if (!profesor.isModified('password')) return next();

    bcrypt.genSalt(10, (err, salt) => {

        if (err) return next();

        bcrypt.hash(profesor.password, salt, null, (err, hash) => {

            if (err) return next();

            profesor.password = hash;
            next();

        });

    })


})




module.exports =
    mongoose.model('Profesor', profesorSchema);