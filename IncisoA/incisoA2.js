
// Cargar archivo elegido en la ultima pagina
window.addEventListener('load', () => {
    fileText = sessionStorage.getItem('FILE');
    lista = fileText.split('\n');
    for (let i = 0; i < lista.length; i++) {
        cadenas = lista[i].split(',');
        lista[i] = cadenas;
    }
    if (lista[lista.length-1] == '') {
        lista.pop();
    }
});

// Seleccionar botones
let opcion1 = document.getElementById("ordenVentas");
let opcion2 = document.getElementById("totalVentas");
let opcion3 = document.getElementById("mayorVentas");
let opcion4 = document.getElementById("menorVentas");
let accept = document.getElementById("aceptar");

let division = document.getElementById("respuesta");

function borrarDiv() {
    var myNode = document.getElementById("respuesta");
    myNode.removeChild(myNode.lastChild);
}

// Funcion para determinar el departamento con mayor ventas (inciso i)
function ordenVentas (sucursal) {
    var max = sucursal[1];
    var num = 1;
    for (var i = 2; i < sucursal.length; i++) {
        if (sucursal[i] > max) {
            max = sucursal[i];
            num = i;
        }
    }
    var res = "Dept #" + num + " con $" + max;
    return res;
}

// Funcion para determinar total de ventas por departamento (inciso ii)
function totalVentas (sucursales, dept) {
    var total = 0;
    for (var i = 0; i < sucursales[0].length; i++) {
        total = total + parseInt(sucursales[i][dept]);
    }
    return total;
}

// Funcion para determinar departamento con mas ventas (inciso iii)
function deptMayorVentas (sucursales) {
    var dept = 1;
    var max = totalVentas(sucursales,dept);
    var deptsConMayorVentas = [];
    deptsConMayorVentas.push(dept);
    
    for (var i = 2; i <= 4; i++) {
        var current = totalVentas(sucursales,i); 
        if (current > max) {
            deptsConMayorVentas.pop();
            deptsConMayorVentas.push(i);
            max = current; 
        } else if (current == max) {
            deptsConMayorVentas.push(i);
        }
    }
    return deptsConMayorVentas;
}

// Funciones para determinar sucursal(es) con menor ventas (inciso iv)
function totalVentasSucursal (sucursal) {
    var total = 0;
    for (var i = 1; i < sucursal.length; i++) {
        total = total + sucursal[i];
    }
    return total;
}
function sucMenorVentas (sucursales) {
    var nomSucursal = [];
    nomSucursal.push(sucursales[0][0]);
    var min = totalVentasSucursal(sucursales[0]);
    for (var i = 1; i < sucursales.length; i++) {
        var totalVentas = totalVentasSucursal(sucursales[i]);
        if (totalVentas < min) {
            nomSucursal.pop();
            nomSucursal.push(sucursales[i][0]);
        } else if (totalVentas == min) {
            nomSucursal.push(sucursales[i][0]);
        }
    }
    return nomSucursal;
}

// Ordenar datos
accept.addEventListener("click", function(e) {
    e.preventDefault();
    console.log("Boton clicked");

    // Checa que radio button esta seleccionado
    if (opcion1.checked) {
        // Inciso i
        borrarDiv();
        var tabla = document.createElement("table");
        tabla.style.width = '100%';
        tabla.setAttribute('border', '1');
        var tbdy = document.createElement("tbody");

        // Crear el header
        var trHeader = document.createElement("tr");
        var header1 = document.createElement("th");
        var header2 = document.createElement("th");
        header1.appendChild(document.createTextNode("Sucursal"));
        header2.appendChild(document.createTextNode("Departamento con mas ventas"));
        trHeader.appendChild(header1);
        trHeader.appendChild(header2);
        tbdy.appendChild(trHeader);

        for (var i = 0; i < lista.length; i++) {
            var tr = document.createElement("tr");
            var tdNom = document.createElement("td");
            tdNom.appendChild(document.createTextNode(lista[i][0]));
            tr.appendChild(tdNom);

            var maxString = ordenVentas(lista[i]);
            var tdMax = document.createElement("td");
            tdMax.appendChild(document.createTextNode(maxString));
            tr.appendChild(tdMax);

            tbdy.appendChild(tr);
        }
        tabla.appendChild(tbdy);
        division.appendChild(tabla);
    } else {
        if (opcion2.checked) {
            // Inciso ii
            borrarDiv();
            var tabla = document.createElement("table");
            tabla.style.width = '100%';
            tabla.setAttribute('border', '1');
            var tbdy = document.createElement("tbody");

            // Crear el header
            var trHeader = document.createElement("tr");
            var header1 = document.createElement("th");
            var header2 = document.createElement("th");
            header1.appendChild(document.createTextNode("Departamento"));
            header2.appendChild(document.createTextNode("Total Ventas"));
            trHeader.appendChild(header1);
            trHeader.appendChild(header2);
            tbdy.appendChild(trHeader);

            for (var i = 1; i <= 4; i++) {
                var tr = document.createElement("tr");

                var tdNom = document.createElement("td");
                tdNom.appendChild(document.createTextNode("Departamento #" + i));
                tr.appendChild(tdNom);
    
                var ventas = totalVentas(lista, i);
                var tdVentas = document.createElement("td");
                tdVentas.appendChild(document.createTextNode("$" + ventas));
                tr.appendChild(tdVentas);
    
                tbdy.appendChild(tr);
            }
            tabla.appendChild(tbdy);
            division.appendChild(tabla);

        } else {
            if (opcion3.checked) {
                // Inciso iii
                borrarDiv();
                var nuevoDiv = document.createElement("div");
                var tagDeptos = document.createElement("h3");

                var res = "Departamento(s) con Mayor Ventas: ";
                var deptsConMayorVentas = deptMayorVentas(lista);
                while(deptsConMayorVentas.length != 0) {
                    dept = deptsConMayorVentas.pop();
                    res = res + "#" + dept + ", ";
                }
                res = res.slice(0,-2);  // Para eliminar la coma y el espacio
                tagDeptos.appendChild(document.createTextNode(res));
                nuevoDiv.appendChild(tagDeptos);
                division.appendChild(nuevoDiv);
            } else {
                if (opcion4.checked) {
                    // Inciso iv
                    borrarDiv();
                    var nuevoDiv = document.createElement("div");
                    var tagDeptos = document.createElement("h3");

                    var res = "Sucursal(es) con Menor Ventas: ";
                    var sucursalesConMenorVentas = sucMenorVentas(lista);
                    while(sucursalesConMenorVentas.length != 0) {
                        nom = sucursalesConMenorVentas.pop();
                        res = res + nom + ", ";
                    }
                    res = res.slice(0,-2);  // Para eliminar la coma y el espacio
                    tagDeptos.appendChild(document.createTextNode(res));
                    nuevoDiv.appendChild(tagDeptos);
                    division.appendChild(nuevoDiv);
                }
            }
        }
    }
});