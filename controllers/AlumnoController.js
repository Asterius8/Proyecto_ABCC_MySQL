'use strict';

const Alumno = require("../models/AlumnoModelo");

exports.create = function (req, res) {
    //validaciones

    // --------------------- ALTA de un nuevo alumno ---------------------
    const a = {
        NumControl: req.body.num_control,//num_control es el nombre del componente grafico 
        Nombre: req.body.nombre,
        PrimerAp: req.body.primer_ap,
        SegundoAp: req.body.segundo_ap,
        FechaNac: req.body.fecha_nac,
        Semestre: req.body.semestre,
        Carrera: req.body.carrera,
    }

    const alumno = new Alumno(a);

    Alumno.create(alumno, function (err, data) {
        console.log("Insercion Alumno", req.body);
        if (err)
            res.send(err);//Mandamos la informacion a la interfaz

        req.flash('message', "Alumno agregado con EXITO!!!");
        res.redirect('/');//Redirecciona al menu principal

    });

};

// --------------------- BAJA de un alumno ---------------------
exports.delete = function (req, res) {
    Alumno.delete(req.params.id, function (err) {
        if (err)
            res.send(err);

        req.flash('message', "Alumno eliminado con exito!!!");
        res.redirect('/');
    });
};

// --------------------- MODIFICACION de un alumno ---------------------
exports.update = function (req, res) {
    Alumno.findById(req.params.id, function (err, alumno) {

        const partes = req.body.fecha_nac.split('/');
        const fechaMysql = `${partes[2]}-${partes[1]}-${partes[0]}`;


        const a = {
            NumControl: req.body.num_control,
            Nombre: req.body.nombre,
            PrimerAp: req.body.primer_ap,
            SegundoAp: req.body.segundo_ap,
            FechaNac: fechaMysql,
            Semestre: req.body.semestre,
            Carrera: req.body.carrera,
        }

        Alumno.update(req.params.id, new Alumno(a), function (err, alumno) {
            if (err) {
                return res.send(err);
            }
            req.flash('message', "Alumno modificado con exito!!!");
            res.redirect('/');


        });
    });
};
// --------------------- CONSULTAR todos los alumnos  ---------------------
exports.findAll = function (req, res) {
    Alumno.findAll(function (err, alumnos) {
        if (err)
            res.send(err);

        res.status(200).send(alumnos);
    });
};

// --------------------- CONSULTAR alumnos por ID (numero de controla)  ---------------------
exports.findById = function (req, res) {
    Alumno.findById(req.params.id, function (err, alumno) {
        if (err)
            res.send(err);

        res.json(alumno);
    });
};
