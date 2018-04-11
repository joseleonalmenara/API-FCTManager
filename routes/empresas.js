const express = require('express');
const empresasController = require('../Controllers/EmpresaController');

let router = express.Router();



router.get('/empresas', empresasController.findAllEmpresas);
router.get('/empresas/:id', empresasController.findById);
router.post('/empresas/add', empresasController.addEmpresa);
router.put('/empresas/edit/:id', empresasController.editEmpresa);
router.delete('/empresas/delete/:id', empresasController.deleteEmpresa);

module.exports = router;