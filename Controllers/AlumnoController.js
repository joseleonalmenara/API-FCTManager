const Alumno = require('../Models/Alumno');
const Empresa = require('../Models/Empresa');
const mongoose = require('mongoose')
/*const User = require('../models/users');*/

/*//GET Obtener todos los alumnos
module.exports.findAllAlumnos = (req, res) => {

    Alumno.find((err, alumnos) => {
        if (err)
            return res
                .status(500)
                .jsonp({
                    error: 500,
                    mensaje: `${err.message}`
                });

        return res.status(200).jsonp(alumnos)


        /*if (alumnos && alumnos.length) {
            User.populate('notas', {path: "autor", select: '_id displayName email avatar'}, (err, notas) =>{
                res
                    .status(200)
                    .jsonp(notas);
            });
        } else {
            res.sendStatus(404);
        }


    });
};*/

//GET Obtener todos los alumnos
module.exports.findAllAlumnos = (req, res) => {

    Alumno.find((err, alumnos) => {
        if (err)
            return res
                .status(500)
                .jsonp({
                    error: 500,
                    mensaje: `${err.message}`
                });

        /*res
            .status(200)
            .jsonp(notas);*/

        if (alumnos && alumnos.length) {
            Alumno.populate(alumnos,
                {path: "empresaAsignada", select: '_id nombre numTelefono direccion' +
                    ' correoElectronico nombreTutorLaboral emailTutorLaboral'}, (err, alumnos) =>{
                res
                    .status(200)
                    .jsonp(alumnos);
            });
        } else {
            res.sendStatus(404);
        }


    });
};

// GET Obtener un alumno
module.exports.findById = (req, res) => {

    Alumno.findById(req.params.id, (err, alumno) => {
        //if (err) return res.send(500, err);
        if (err)
            return res
                .status(404)
                .jsonp({
                    error: 404,
                    mensaje: 'No existe un alumno con ese ID'
                });

        /* //res.status(200).jsonp(nota);
         User.populate(nota, {
             path: "autor",
             select: '_id displayName email avatar'
         }, (err, nota)=>{
             res.status(200).jsonp(nota)
         });*/

        return res.status(200).jsonp(alumno)


    });
};


/*//POST Nuevo alumno
module.exports.addAlumno = (req, res) => {

    let nuevoAlumno = new Alumno({
        nombre: req.body.nombre,
        apellidos: req.body.apellidos,
        numTelefono: req.body.numTelefono,
        correoElectronico: req.body.correoElectronico,
        notaMedia: req.body.notaMedia,
        empresaAsignada: req.body.empresaAsignada,
        direccion: req.body.direccion,
        foto: req.body.foto
        /*autor: req.user
    });

    nuevoAlumno.save(function(err, alumno) {
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
            res.status(201).jsonp(nota)
        });

        res.status(201).jsonp(alumno);

    });

}*/

//POST Nuevo alumno
module.exports.addAlumno = (req, res) => {

    /*const empresa = Empresa.findOne({_id: req.body.id})*/

    Empresa.findOne({_id: req.body.empresaAsignada}).exec((err, empresa) => {
        if (err) return res.status(401).jsonp({error: 401, mensaje: 'Error'});
        if (!empresa) return res.status(404).jsonp({error: 404, mensaje: 'No existe la empresa'});
        req.empresa = empresa;
        res.status(200).jsonp({
            empresa: empresa
        });

        let nuevoAlumno = new Alumno({
            nombre: req.body.nombre,
            apellidos: req.body.apellidos,
            numTelefono: req.body.numTelefono,
            correoElectronico: req.body.correoElectronico,
            notaMedia: req.body.notaMedia,
            empresaAsignada: mongoose.Types.ObjectId(empresa._id),
            direccion: req.body.direccion,
            foto: req.body.foto
        });

        nuevoAlumno.save(function (err, alumno) {
            if (err)
                return res
                    .status(500)
                    .jsonp({
                        error: 500,
                        mensaje: `${err.message}`
                    });


            Alumno.populate(alumno, {
                path: "empresaAsignada",
                select: '_id nombre correoElectronico'
            }, (err, alumno) => {
                res.status(201).jsonp(alumno)
            });

        });


    })
}

// PUT Editar un alumno

module.exports.editAlumno = (req, res) => {

    Alumno.findById(req.params.id, function (err, alumno) {

        alumno.nombre = req.body.nombre,
        alumno.apellidos = req.body.apellidos,
        alumno.numTelefono = req.body.numTelefono,
        alumno.correoElectronico = req.body.correoElectronico,
        alumno.notaMedia = req.body.notaMedia,
        alumno.empresaAsignada = req.body.empresaAsignada,
        alumno.direccion = req.body.direccion,
        alumno.foto = req.body.foto


        alumno.save(function(err, alumno) {
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

            return res.status(201).jsonp(alumno)


        })


    });


}

// DELETE Borrar un alumno

module.exports.deleteAlumno = (req, res) => {

    Alumno.findById(req.params.id, (err, alumno) => {
        if (alumno === undefined)
            return res.sendStatus(404);

        alumno.remove((err) => {
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