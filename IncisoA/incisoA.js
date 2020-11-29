/*
Lectura de archivo de texto
*/

function leerArchivo(e) {
    var archivo = e.target.files[0];
    if (!archivo) {
        return;
    }
    var lector = new FileReader();
    lector.onload = function (e) {
        var contenido = e.target.result;
        sessionStorage.setItem("FILE", contenido);
    }
    lector.readAsText(archivo);
    window.location.href = "incisoA2.html";
}

function handleSubmit () {
    const text = document.getElementById('pruebaText').value;
    sessionStorage.setItem("TEXTO", text);
    return;
}
// Inciso A
document.getElementById('file-input').addEventListener('change', leerArchivo, false);
