// 1o: Variables requeridas para activar el servidor web local.
const express = require('express');
const servidor = express();
const router = express.Router();    // Se usará para especificar la ruta de la pag. principal
const path = require('path');   // Para dar dicha ruta

 // Conexion a la BD en mysql
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

// “Listar el nombre de los artículos que aparecen en un mínimo de cinco pedidos. 
// Acompañarlos con la clave y la fecha de los pedidos en los cuales aparecen”.
var query = "SELECT p.FechaPed, d.FolioP, a.Nombre \
    from Detalle d, Articulos a, Pedidos p where d.FolioP=p.FolioP and d.IdArt=a.IdArt and d.IdArt in \
        (select d.IdArt from Detalle d \
        group by d.IdArt \
        having count(d.IdArt)>=5) \
    order by a.Nombre";

// Alternativa 1

res = [];
conex.query('select * from usuarios', [], function (err, result) {
    if (err) {
        console.log("Error de conexion: " + err.stack); process.exit(1);
    } else {
        result.forEach(function (element) {
            res.push(element)
        });
    }
});


var division = document.getElementById("respuesta");
var tag = document.createElement("h3");
var text = document.createTextNode(res[0].Nombre);
tag.appendChild(text);
division.appendChild(tag);

conex.end;
