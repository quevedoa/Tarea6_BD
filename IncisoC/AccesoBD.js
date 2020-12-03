/*
Este archivo utilizará node.js para hablar con MySQL y ejecutar el delete
*/

// Inicializa variables de express
const express = require('express');
const servidor = express();
const router = express.Router();
const path = require('path');
const port = 8000;

// Conecta a MySQL
var mysql = require("mysql");
var conex = mysql.createConnection({
    host: 'localhost', user: 'usuarioBD', password: 'adminadmin', database: 'PedidosClientes'
});
conex.connect(function (err) {
    if (err) {
        console.log("Error de conexion: " + err.stack);
        process.exit(1);
    } else {
        console.log("Conectado con id: " + conex.threadId);
    }
});

// Sirve para acceder incisoBJS.js
servidor.use(express.static(path.join(__dirname,'public')));

servidor.use('/', router);
servidor.listen(port, function() {
    console.log("El servidor está disponible en el puerto " + port);
    console.log("Terminar con <ctrl><c>");
});

// Activa el servidor y le manda el html de la vista.
router.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, 'incisoC.html'));
    // Primero busca el último articulo agregado al encontrar el idart más grande
    var query = "select idart from articulos order by idart desc limit 1";
    conex.query(query, [], function (err, result) {
        if (err) {
            console.log("Error de conexion: " + err.stack); process.exit(1);
        } else {
            // Si no hay error salva el idart del ultimo articulo agregado
            var id = result[0].idart;
            // Hace un delete con el idart para borrar el ultimo articulo agregado
            var delQuery = "delete from articulos where idart=" + id;
            conex.query(delQuery, [], function (err, result) {
                if (err) {
                    console.log("Error de conexion: " + err.stack); process.exit(1);
                } else {
                    console.log("Se ha borrado.");
                }
            }); 
        }
    });
    res.send("Se ha borrado con éxito.");
});