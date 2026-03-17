const express = require('express');
const router = express.Router();

const alumno_controller = require('../controllers/AlumnoController');

// RUTA ALTAS
router.post('/', alumno_controller.create);

// RUTA BAJAS  
router.post('/eliminar/:id', alumno_controller.delete);

//RUTA CAMBIOS
router.post('/:id', alumno_controller.update);

//RUTA CONSULTAS
router.get('/', alumno_controller.findAll);//puede ser la misma ruta que altas porque aqui solo recibe 

router.get('/:id', alumno_controller.findById);

module.exports = router;// con este puede acceder desde otros archivos