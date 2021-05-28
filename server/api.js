const dbusuario = require('./tables/dbusuario');

var express = require('express');
var cors = require('cors');
const { json, urlencoded } = require('body-parser');
const { request } = require('express');
const dbTareas = require('./tables/dbTareas');
var app = express();
var router = express.Router();

app.use(urlencoded({ extended: true }));
app.use(json());
app.use(cors());
app.use('/api', router); //Ruta principal

//Obtener todos los usuarios
router.route('/usuarios').get((request, response) => {
    dbusuario.getUsuarios().then(res => {
        response.json(res[0]);
    })
});

//Guardar usuario
router.route('/usuarios').post((request, response) => {
    let usuario = {...request.body};
    usuario.accion = (usuario.id == undefined)? "guardar" : "eliminar";
    dbusuario.saveUsuario(usuario).then(res => {
        response.json(res[0]);
    });
});

//Eliminar usuario
router.route('/usuarios/:id').delete((request, response) => {
    const id = request.params.id;
    dbusuario.deleteUsuario(id).then(res => {
        response.json(res[0]);
    });
});

//Cargar tareas
router.route('/tareas').get((request, response) => {
    dbTareas.getTareas().then(res => {
        response.json(res[0]);
    });
});

//Guardar tareas
router.route('/tareas').post((request, response) => {
    let tarea = {...request.body};
    tarea.accion = (tarea.id == undefined)? "guardar" : "editar";
    dbTareas.saveTareas(tarea).then(res => {
        response.json(res[0]);
    });
});

router.route('/tareas/:id').delete((request, response) => {
    let id = request.params.id;
    dbTareas.deleteTareas(id).then(res => {
        response.json(res[0]);
    });
});

var port = process.env.PORT || 8090;
app.listen(port);
console.log('Conectado al puerto: ' + port);