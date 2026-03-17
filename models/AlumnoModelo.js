'use strict';
const conexion = require('../config/database');

let Alumno = function (alumno) {
    this.NumControl = alumno.NumControl;
    this.Nombre = alumno.Nombre;
    this.PrimerAp = alumno.PrimerAp;
    this.SegundoAp = alumno.SegundoAp;
    this.FechaNac = alumno.FechaNac;
    this.Semestre = alumno.Semestre;
    this.Carrera = alumno.Carrera;

};

//==================================== Logica para la BD Relacional ====================================
//++++++++ ALTAS ++++++++
Alumno.create = function (alumno, result) {
    conexion.query("INSERT INTO Alumnos SET ?", alumno, function (err, res) {
        if (err) {
            console.log("Error: ", err);
            result(err, null);
        } else {
            console.log("Insercion realzada con EXITO");
            result(null, res.insertId);// el result es para llevar informacion a la interfaz grafica
        }

    });//sintaxis para insertar de datos desde un objeto
}

//++++++++ BAJAS ++++++++
Alumno.delete = function (nc, result) {
    conexion.query("DELETE FROM Alumnos WHERE NumControl = ?", [nc], function (err, res) {
        if (err) {
            console.log("Error: ", err);
            result(err, null);
        } else {
            console.log("Eliminacion realizada con EXITO");
            result(null, res);
        }
    });
}

//++++++++ CAMBIOS ++++++++
Alumno.update = function (id, alumno, result) {
    conexion.query("UPDATE Alumnos SET Nombre=?, PrimerAp=?, SegundoAp=?, FechaNac=?, Semestre=?, Carrera=? WHERE NumControl=?", [alumno.Nombre, alumno.PrimerAp, alumno.SegundoAp, alumno.FechaNac, alumno.Semestre, alumno.Carrera, id], function (err, res) {
        if (err) {
            console.log("Error: ", err);
            result(err, null);
        } else {
            console.log("Actualizacion realzada con EXITO");
            result(null, res);
        }
    });
}

//++++++++ CONSULTAS ++++++++
Alumno.findById = function (nc, result) {
    conexion.query("SELECT * FROM Alumnos WHERE NumControl=?", [nc], function (err, res) {
        if (err) {
            console.log("Error: ", err);
            result(err, null);
        } else {
            console.log(res);
            result(null, res);
        }
    });
}

Alumno.findAll = function (result) {
    conexion.query("SELECT * FROM Alumnos", function (err, res) {
        if (err) {
            console.log("Error: ", err);
            result(err, null);
        } else {
            console.log(res);
            result(null, res);
        }
    });
}

module.exports = Alumno;