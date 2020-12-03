/*
Programa ServidorWeb_BD.js
Muestra el acceso a una base de datos mysql desde el servidor web creado con node.js
*/

// Inicializar express
const express = require('express');
const servidor = express();
const router = express.Router();
const path = require('path');
const port = 3000;

// Conectar a MySQL
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

// Activa el servidor y le manda el html de la vista.
router.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, 'incisoB.html'));
});
servidor.use('/', router);
servidor.listen(port, function() {
    console.log("El servidor está disponible en el puerto " + port);
    console.log("Terminar con <ctrl><c>");
});

// Query para ver artículos que aparecen en un mínimo de cinco pedidos
var query = "SELECT p.FechaPed, d.FolioP, a.Nombre from Detalle d, Articulos a, Pedidos p \
    where d.FolioP=p.FolioP and d.IdArt=a.IdArt and d.IdArt in \
        (select d.IdArt from Detalle d \
        group by d.IdArt \
        having count(d.IdArt)>=5) \
    order by a.Nombre";  

// Cuando se carga localhost en el port 3000 corre esta función
router.get('/incisoBJS', function(req, res) {
    // Hace el query previamente definido y lo corre en MySQL
    conex.query(query, [], function (err, result) {
        if (err) {
            console.log("Error de conexion: " + err.stack); process.exit(1);
        } else {
            res.status(200).json(result); // Si el query fue exitoso manda el resultado para que incisoBJS.js lo lea.
        }
    });
});