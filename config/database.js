
const mysql = require('mysql2');

const conexion = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'oscar08',
    database: 'db_Express_2026',
});

conexion.connect(function(err){
    if(err)
        throw err;
    console.log('Conexion a la base de datos exitosa :D');
});

module.exports = conexion;//aplica ambito de vida para esta conexion poder usarla en otros archivos