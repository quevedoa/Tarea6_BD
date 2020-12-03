/*
Lectura de archivo de texto
*/

// Esta funcion lee el archivo 
function leerArchivo(e) {
    var archivo = e.target.files[0];
    if (!archivo) {
        return;
    }
    var lector = new FileReader();
    lector.onload = function (e) {
        var contenido = e.target.result;
        sessionStorage.setItem("FILE", contenido); // Asigna el texto contenido en el archivo en una variable de sesion
    }
    lector.readAsText(archivo);
    window.location.href = "incisoA2.html"; // Redirect a la página de los botones de radio
}

// Inciso A
// Espera que se cargue un archivo de texto y corre la función de leerArchivo
document.getElementById('file-input').addEventListener('change', leerArchivo, false);
