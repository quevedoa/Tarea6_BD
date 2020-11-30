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

// 4o: Servirá para acceder archivos "estaticos" (html, css, etc.)
servidor.use(express.static(path.join(__dirname,'public')));

// 5o: Activar el servidor.
router.get('/', function(req, res) {
    // getUsuarios();
    res.sendFile(path.join(__dirname, 'incisoB.html'));
});
servidor.use('/', router);
servidor.listen(3000, function() {
    console.log("El servidor, via Express, esta ejecutandose en el puerto 3000");
    console.log("Terminar con <ctrl><c>");
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
            res.push(element);
        });
    }
});

conex.end;
