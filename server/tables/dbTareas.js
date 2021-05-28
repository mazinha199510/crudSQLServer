let config = require('../dbconfig');
const sql = require('mssql');

//Funciones para generar las tareas
async function getTareas(){
    try {
        let pool = await sql.connect(config);
        let tareas = await pool.request().execute('SP_GET_TAREAS');
        return tareas.recordsets;
    } catch (error) {
        console.log(error);
    }
}

async function saveTareas(tarea){
    try {
        let id = (tarea.id == undefined)? 0 : tarea.id;
        let pool = await sql.connect(config);
        let tareas = await pool.request()
        .input("id", id)
        .input("nombre", tarea.nombre)
        .input("descripcion", tarea.descripcion)
        .input("usuario", tarea.usuario)
        .input("accion", tarea.accion).execute('SP_SAVE_UPDATE_TAREAS');
        return tareas.recordsets;
    } catch (error) {
        console.log(error);
    }
}


async function deleteTareas(id){
    try {
        let pool = await sql.connect(config);
        let tarea = await pool.request().input('id', id).execute("SP_DELETE_TAREA");
        return tarea.recordsets;
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    getTareas : getTareas,
    saveTareas : saveTareas,
    deleteTareas : deleteTareas
}