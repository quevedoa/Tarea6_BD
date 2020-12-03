/*
Hace la solicitud al servidor creado con express.js y saca el query que se hace ahí.
Después extrae la tabla con un XMLHTTP Request y las despliega en una tabla
*/

let objArticulos = {
    // Conecta los datos del query a la tabla en la vista html
    muestraArticulos: function (articulos) {
        // Hace referencia a la tabla ya creada 'tbArticulos'
        tablaArticulos = document.getElementById('tbArticulos');
        tablaArticulos.style.width = '100%'; // Le da estilo a la tabla para que se vea mejor
        tablaArticulos.style.textAlign = 'center';
        tablaArticulos.setAttribute('border', '1');

        // Para cada renglon de la tabla del query agrega un renglon en la tabla del html
        articulos.forEach(function (articulo) {
            // Crea los renglones y datos de los renglones
            let renglón = document.createElement('tr');
            let columnas = [];
            columnas.fecha = document.createElement('td');
            var fechaPedLimpia = (articulo.FechaPed).slice(0,10);
            columnas.fecha.appendChild(document.createTextNode(fechaPedLimpia));
            columnas.folio = document.createElement('td');
            columnas.folio.appendChild(document.createTextNode(articulo.FolioP));
            columnas.nombre = document.createElement('td');
            columnas.nombre.appendChild(document.createTextNode(articulo.Nombre));

            // Pega los renglones a la tabla creada previamente
            renglón.appendChild(columnas.nombre);
            renglón.appendChild(columnas.fecha);
            renglón.appendChild(columnas.folio);
            tablaArticulos.appendChild(renglón);
        })
    },

    // La funcion conecta al servidor para sacar el request
    getArticulos: function () {
        // El objeto saca la solicitud del servidor
        let xhr = new XMLHttpRequest();
        let route = '/incisoBJS';

        // Esta función se dispara cuando el xhr nota algún cambio, 
        // en este caso se mandó la tabla del query
        xhr.onreadystatechange = function() {
            if (xhr.readyState === 4) { // Todos los datos se recibieron y pueden usarse.
                if (xhr.status != 200) {    // Verifica que no haya habido error.
                    console.error("No se pudo leer request. Status:" + xhr.status);
                    process.exit(1);
                }
                this.muestraArticulos(JSON.parse(xhr.responseText)); // Le manda a la función muestraArticulos el query
            }
        }.bind(this);
        xhr.open("get", route, true);
        xhr.send();
    }
}

// Inicia todo el proceso de solicitar al servidor
objArticulos.getArticulos();