let config = require('../dbconfig');
const sql = require('mssql');

//Funciones para generar las acciones
async function getUsuarios(){
    try {
        let pool = await sql.connect(config);
        let usuarios = await pool.request().execute('SP_GET_USUARIOS');
        return usuarios.recordsets;
    } catch (error) {
        console.log(error);
    }
}

async function saveUsuario(usuario){
    try {
        let id = (usuario.id == undefined)? null : usuario.id;
        let pool = await sql.connect(config);
        let insert = await pool.request()
        .input("id", id)
        .input("nombre", usuario.nombre)
        .input("correo", usuario.correo)
        .input("usuario", usuario.usuario)
        .input("contraseña", usuario.contrasena)
        .input("accion", usuario.accion)
        .execute('SP_SAVE_USUARIO');
        return insert.recordsets;
    } catch (error) {
        console.log(error);
    }
}

async function deleteUsuario(id){
    try {
        let pool = await sql.connect(config);
        let eliminar = await pool.request().input("id", id).execute('SP_DELETE_USUARIO');
        return eliminar.recordsets;
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    getUsuarios: getUsuarios,
    saveUsuario: saveUsuario,
    deleteUsuario: deleteUsuario
};