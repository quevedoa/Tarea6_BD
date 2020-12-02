/*
Programa ServidorWeb_BD.js
Muestra el acceso a una base de datos mysql desde el servidor web creado con node.js
*/

// 1o: Variables requeridas para activar el servidor web local.
const express = require('express');
const servidor = express();
const router = express.Router();    // Se usará para especificar la ruta de la pag. principal
const path = require('path');   // Para dar dicha ruta
const port = 8000;

// 2o: Conexión a la BD mysql.
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

// 3o: Acceso a la BD: consulta para obtener los datos de los usuarios.
function getUsuarios() {
    conex.query('select * from usuarios', [], function (err, result) {
        if (err) {
            console.log("Error de conexion: " + err.stack); process.exit(1);
        } else {
            result.forEach(function (element) {
                console.log("RFC: " + element.RFC + "\t Nombre: " + element.Nombre + 
                    "\t\t Tipo: " + element.Tipo);
            });
        }
    });
}

// 4o: Servirá para acceder archivos "estaticos" (html, css, etc.)
servidor.use(express.static(path.join(__dirname,'public')));

// 5o: Activar el servidor.
router.get('/', function(req, res) {
    // getUsuarios();
    res.sendFile(path.join(__dirname, 'incisoC.html'));
});
servidor.use('/', router);
servidor.listen(port, function() {
    console.log("El servidor, via Express, esta ejecutandose en el puerto " + port);
    console.log("Terminar con <ctrl><c>");
});

// 7o: (comentar el llamado a getUsuarios()).
// Se obtienen los datos de los usuarios; el resultado lo regresa como dato json al servidor de node
// router.get('/incisoCJS', function(req, res) {
//     conex.query(query, [], function (err, result) {
//         if (err) {
//             console.log("Error de conexion: " + err.stack); process.exit(1);
//         } else {    // Env'ia el resultado de la consulta con exito
//             res.status(200).json(result);
//         }
//     });
// });
function borrarUltimoArticulo () {
    
}

router.get('/incisoCJS', function(req, res) {
    var query = "select idart from articulos order by idart desc limit 1";
    conex.query(query, [], function (err, result) {
        if (err) {
            console.log("Error de conexion: " + err.stack); process.exit(1);
        } else {
            var id = result[0].idart;
            var delQuery = "delete from articulos where idart=" + id;
            conex.query(delQuery, [], function (err, result) {
                if (err) {
                    console.log("Error de conexion: " + err.stack); process.exit(1);
                } else {
                    console.log("Lo HICIMOS!!!");
                }
            }); 
        }
    });
});