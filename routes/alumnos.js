const express = require('express');
const alumnosController = require('../Controllers/AlumnoController');

let router = express.Router();


router.get('/alumnos', alumnosController.findAllAlumnos);
router.get('/alumnos/:id', alumnosController.findById);
router.post('/alumnos/add', alumnosController.addAlumno);
router.put('/alumnos/edit/:id', alumnosController.editAlumno);
router.delete('/alumnos/delete/:id', alumnosController.deleteAlumno);

module.exports = router;