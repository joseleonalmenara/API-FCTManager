const express = require('express');
const profesorController = require('../Controllers/ProfesorController');

let router = express.Router();


router.get('/profesores', profesorController.findAllProfesores);
router.get('/profesores/:id', profesorController.findById);
/*router.post('/profesores/add', profesorController.addAlumno);*/
router.put('/profesores/edit/:id', profesorController.editProfesor);
router.delete('/profesores/delete/:id', profesorController.deleteProfesor);



router.post('/register', profesorController.registro);
router.post('/login', profesorController.login);

module.exports = router;