const Empresa = require('../Models/Empresa');
/*const User = require('../models/users');*/

//GET Obtener todas las empresas
module.exports.findAllEmpresas = (req, res) => {

    Empresa.find((err, empresas) => {
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

        return res.status(200).jsonp(empresas)


    });
};

// GET Obtener una empresa
module.exports.findById = (req, res) => {

    Empresa.findById(req.params.id, (err, empresa) => {
        //if (err) return res.send(500, err);
        if (err)
            return res
                .status(404)
                .jsonp({
                    error: 404,
                    mensaje: 'No existe una empresa con ese ID'
                });

       /* //res.status(200).jsonp(nota);
        User.populate(nota, {
            path: "autor",
            select: '_id displayName email avatar'
        }, (err, nota)=>{
            res.status(200).jsonp(nota)
        });*/

        return res.status(200).jsonp(empresa)


    });
};

//POST Nueva empresa
module.exports.addEmpresa = (req, res) => {

    let nuevaEmpresa = new Empresa({
        nombre: req.body.nombre,
        numTelefono: req.body.numTelefono,
        direccion: req.body.direccion,
        correoElectronico: req.body.correoElectronico,
        latLng: req.body.latLng,
        nombreTutorLaboral: req.body.nombreTutorLaboral,
        emailTutorLaboral: req.body.emailTutorLaboral
    });

    nuevaEmpresa.save(function(err, empresa) {
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
        });*/

        //res.status(201).jsonp(nota);

        res.status(201).jsonp(empresa);

    });

}

// PUT Editar una empresa

module.exports.editEmpresa = (req, res) => {

    Empresa.findById(req.params.id, function (err, empresa) {
        empresa.nombre = req.body.nombre,
        empresa.numTelefono = req.body.numTelefono,
        empresa.direccion = req.body.direccion,
        empresa.correoElectronico = req.body.correoElectronico,
        empresa.latLng = req.body.latLng,
        empresa.nombreTutorLaboral = req.body.nombreTutorLaboral,
        empresa.emailTutorLaboral = req.body.emailTutorLaboral



        empresa.save(function(err, empresa) {
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

            return res.status(201).jsonp(empresa)


        })


    });


}

// DELETE Borrar una empresa

module.exports.deleteEmpresa = (req, res) => {

    Empresa.findById(req.params.id, (err, empresa) => {
        if (empresa === undefined)
            return res.sendStatus(404);

        empresa.remove((err) => {
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