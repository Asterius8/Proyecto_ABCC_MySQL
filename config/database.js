
const mysql = require('mysql2');

const conexion = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
    ssl: {
        rejectUnauthorized: false
    }
});

conexion.connect(function (err) {
    if (err)
        throw err;
    console.log('Conexion a la base de datos exitosa :D');
});

module.exports = conexion;//aplica ambito de vida para esta conexion poder usarla en otros archivos