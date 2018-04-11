const Profesor = require('../Models/Profesor');
const service = require('../Services');
const bcrypt = require('bcrypt-nodejs');
/*const User = require('../models/users');*/

//GET Obtener todos los profesores
module.exports.findAllProfesores = (req, res) => {

    Profesor.find((err, profesores) => {
        if (err)
            return res
                .status(500)
                .jsonp({
                    error: 500,
                    mensaje: `${err.message}`
                });


        /*if (alumnos && alumnos.length) {
            User.populate('notas', {path: "autor", select: '_id displayName email avatar'}, (err, notas) =>{
                res
                    .status(200)
                    .jsonp(notas);
            });
        } else {
            res.sendStatus(404);
        }*/

        return res.status(200).jsonp(profesores)


    });
};

// GET Obtener un profesor
module.exports.findById = (req, res) => {

    Profesor.findById(req.params.id, (err, profesor) => {
        //if (err) return res.send(500, err);
        if (err)
            return res
                .status(404)
                .jsonp({
                    error: 404,
                    mensaje: 'No existe un profesor con ese ID'
                });

       /* //res.status(200).jsonp(nota);
        User.populate(nota, {
            path: "autor",
            select: '_id displayName email avatar'
        }, (err, nota)=>{
            res.status(200).jsonp(nota)
        });*/

        return res.status(200).jsonp(profesor)


    });
};

/*//POST Nuevo profesor
module.exports.addProfesor = (req, res) => {

    let nuevoProfesor = new Profesor({
        nombre: req.body.nombre,
        apellidos: req.body.apellidos,
        numTelefono: req.body.numTelefono,
        correoElectronico: req.body.correoElectronico,
        password: req.body.password,
        avatar: req.body.avatar,
    });

    nuevoProfesor.save(function(err, profesor) {
        if (err)
            return res
                .status(500)
                .jsonp({
                    error: 500,
                    mensaje: `${err.message}`
                });*/


        /*User.populate(nota, {
            path: "autor",
            select: '_id displayName email avatar'
        }, (err, nota)=>{
            res.status(201).jsonp(nota)
        });*/

        //res.status(201).jsonp(nota);

        /*res.status(201).jsonp(profesor);

    });

}*/

// PUT Editar un profesor

module.exports.editProfesor = (req, res) => {

    Profesor.findById(req.params.id, function (err, profesor) {
        profesor.nombre = req.body.nombre;
        profesor.apellidos = req.body.apellidos;
        profesor.numTelefono = req.body.numTelefono;
        profesor.correoElectronico = req.body.correoElectronico;
        profesor.password = req.body.password;
        profesor.avatar = req.body.avatar;


        profesor.save(function(err, profesor) {
            if (err)
                return res
                    .status(500)
                    .jsonp({
                        error: 500,
                        mensaje: `${err.message}`
                    });

            /*User.populate(nota, {
                path: "autor",
                select: '_id displayName email avatar'
            }, (err, nota)=>{
                res.status(200).jsonp(nota)
            });*/

            return res.status(201).jsonp(profesor)


        })


    });


}

// DELETE Borrar un profesor

module.exports.deleteProfesor = (req, res) => {

    Profesor.findById(req.params.id, (err, profesor) => {
        if (profesor === undefined)
            return res.sendStatus(404);

        profesor.remove((err) => {
            if (err)
                return res
                    .status(500)
                    .jsonp({
                        error: 500,
                        mensaje: `${err.message}`
                    });
            res.sendStatus(204);
        });
    });

}

// POST Nuevo usuario profesor
module.exports.registro = (req, res) => {
    let nuevoProfesor = new Profesor({
        nombre: req.body.nombre,
        apellidos: req.body.apellidos,
        numTelefono: req.body.numTelefono,
        correoElectronico: req.body.correoElectronico,
        password: req.body.password,
        avatar: req.body.avatar,
    });

    nuevoProfesor.save((err, result) => {
        if (err)
            return res
                .status(500)
                .jsonp({
                    error: 500,
                    mensaje: `${err.message}`
                });

        return res.status(201).jsonp({
            token: service.createToken(nuevoProfesor),
            nombre: result.nombre,
            correoElectronico: result.correoElectronico,
            password: result.password,
            avatar: result.avatar
        });


    });

}

//POST login

module.exports.login = (req, res) => {

    Profesor
        .findOne({correoElectronico: req.body.correoElectronico})
        .select('_id correoElectronico +password nombre apellidos avatar ')
        .exec((err, profesor) => {

            if (err) return res.status(401).jsonp({error: 401, mensaje: 'Error en la autenticación'});
            if (!profesor) return res.status(404).jsonp({error: 404, mensaje: 'No existe el usuario'});

            bcrypt.compare(req.body.password, profesor.password, (err, result) => {
                if (err) return res.status(401).jsonp({error: 401, mensaje: 'Error en la autenticación'});
                if (result == false)
                    return res.status(401).jsonp({error: 401, mensaje: 'Error en la autenticación'});
                else {
                    req.profesor = profesor;
                    res.status(200).jsonp({
                        mensaje: 'Login correcto',
                        token: service.createToken(profesor),
                        nombre: profesor.nombre,
                        apellidos: profesor.apellidos,
                        correoElectronico: profesor.correoElectronico,
                        avatar: profesor.avatar
                    });
                }
            });


        });



}
