const http = require('http');
const server = http.createServer();

const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const session = require('express-session');
const flash = require('express-flash');

const app = express();

app.use(session( {secret:'secret', resave:false, saveUnitialized:false} ));
app.use(flash());
app.use('/public', express.static(__dirname + '/public'));//establece el acceso a recursos estaticos como imagenes e iconos
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));//linea para indicar las vistas

const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.use('/css', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/css')));
app.use('/js', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/js')));

// --------------- RENDERIZADO de VISTAS ---------------
app.get('/', (req, res)=>{

    let message = req.flash('message');
    res.render('index', {data:message} );

});

app.get('/alta_alumno', (req, res) => {

    res.render('alta_alumno');

});

app.get('/editar', (req, res) => {
    res.render('cambio_alumno');
});

app.get('/altas', (req, res) => {

    res.render('altas');

});

app.get('/cambios', (req, res) => {

    res.render('cambios');

});

app.get('/consulta', (req, res) => {

    res.render('consulta_alumno');

});

const alumno_rutas = require('./routes/alumnos_routes');

app.use('/alumnos', alumno_rutas);

app.listen(port, function(){
    console.log('Servidor escuchando en puerto 3000');
});
/*
function servidor(req, res){
    res.writeHead(200, {'content-type':'text/plain'});//esto dice que la peticion es correcta
    res.write('================ Magia magia con NodeJS ========================');
    res.end();
}

server.on('request', servidor);// cuando el servidor detecta un request arrojara la funcion de servidor

server.listen(3000, function(){
    console.log('Escuchando por el puerto 3000');
});
*/