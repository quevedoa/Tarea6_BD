/*
Este programa hace la solicitud al servidor de node.js para que ejecute la consulta de los usuarios,
recibe la respuesta y l;a despliega en una tabla de html
*/

// 8vo: Código para mostrar los resultados y hacer la solicitud al navegador.
let objUsusarios = {
    // Este metodo despliega los datos de los usuarios den la pagina del navegador
    muestraUsuarios: function (usuarios) {
        //Agregar elementos a la tabla de usuarios.
        //console.log("Entre usuarios");
        tablaUsuarios = document.getElementById('tbUsuarios');
        //Aquí colocar los valores para el encabezado de la tabla.

        //Agregar los datos de la tabla.
        usuarios.forEach(function (usuario) {
            let renglón = document.createElement('tr');
            let columnas = [];
            //Crea las filas de datos de la tabla.
            columnas.rfc = document.createElement('td');         //RFC.
            columnas.rfc.appendChild(document.createTextNode(usuario.RFC));
            columnas.nombre = document.createElement('td');      //Nombre.
            columnas.nombre.appendChild(document.createTextNode(usuario.Nombre));
            columnas.tipo = document.createElement('td');      //Nombre.
            columnas.tipo.appendChild(document.createTextNode(usuario.Tipo));

            //Las agrega a la tabla.
            renglón.appendChild(columnas.rfc);
            renglón.appendChild(columnas.nombre);
            renglón.appendChild(columnas.tipo);
            tablaUsuarios.appendChild(renglón);

        })
        //Letrero después de la tabla.
        forma = document.getElementById("f1");
        var enc = document.createElement("h3");
        var textoEnc = document.createTextNode("Fin de los datos");
        enc.appendChild(textoEnc);
        forma.appendChild(enc);
    },

    // Controla la solicitud al servidor de node.js para que este ordene
    // la ejecucion de los usuarios.
    getUsuarios: function () {
        console.log("Usuarios 1");
        // El siguiente objeto es el que hace la solicitud al servidor.
        // Se requiere especificar la ruta donde se encuentra este programa.
        let xhr = new XMLHttpRequest();
        let route = '/incisoBJS';

        // Cuando el servidor responde y envía la respuesta completa, se
        // dispara el siguiente evento y se ejecuta la funcion anonima.
        xhr.onreadystatechange = function() {
            if (xhr.readyState === 4) { // Todos los datos se recibieron y pueden usarse.
                if (xhr.status != 200) {    // Verifica que no haya habido error.
                    console.error("Usuarios no leidos. Status:" + xhr.status);
                    process.exit(1);
                }
                console.log("Usuarios 2");
                //alert(xhr.responseText);
                this.muestraUsuarios(JSON.parse(xhr.responseText));
            }
            console.log("Usuarios 3");
        }.bind(this);
        console.log("Usuarios 4");
        xhr.open("get", route, true);
        xhr.send();
    }
}

// Inicia el proceso de solicitud al servidor.
objUsusarios.getUsuarios();