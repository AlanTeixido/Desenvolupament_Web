var colores = ["blanco", "amarillo", "azul", "negro", "rosa", "verde"];
var codigoSecreto = generarCodigoSecreto();

function generarCodigoSecreto() {
    var codigo = [];
    for (var i = 0; i < 4; i++) {
        var colorIndex = Math.floor(Math.random() * colores.length);
        codigo.push(colores[colorIndex]);
    }
    return codigo;
}

function crearCirculo(color) {
    var circle = document.createElement("div");
    circle.className = "color-circle";
    circle.style.backgroundColor = color;
    return circle;
}

function inicializarTablero() {
    var tabla = document.getElementById("game-board");
    for (var i = 0; i < 10; i++) {
        var fila = document.createElement("tr");
        for (var j = 0; j < 4; j++) {
            var celda = document.createElement("td");
            var circle = crearCirculo("gray");
            celda.appendChild(circle);
            fila.appendChild(celda);
        }
        tabla.appendChild(fila);
    }
}

function actualizarTablero(fila, intento) {
    for (var i = 0; i < 4; i++) {
        var celda = fila.children[i];
        var circle = celda.firstChild;
        circle.style.backgroundColor = intento[i];
    }
}

function calcularPegs(intento, codigoSecreto) {
    var blackPegs = 0;
    var whitePegs = 0;

    for (var i = 0; i < 4; i++) {
        if (intento[i] === codigoSecreto[i]) {
            blackPegs++;
        } else if (codigoSecreto.includes(intento[i])) {
            whitePegs++;
        }
    }

    return [blackPegs, whitePegs];
}

document.addEventListener("DOMContentLoaded", function () {
    inicializarTablero();

    var filas = document.getElementById("game-board").getElementsByTagName("tr");

    for (var i = 0; i < filas.length; i++) {
        filas[i].addEventListener("click", function () {
            var fila = this;
            var intento = [];

            for (var i = 0; i < 4; i++) {
                var circle = fila.children[i].firstChild;
                intento.push(circle.style.backgroundColor);
            }

            var pegs = calcularPegs(intento, codigoSecreto);
            actualizarFeedback(fila, pegs[0], pegs[1]);
        });
    }
});

function actualizarFeedback(fila, blackPegs, whitePegs) {
    var feedbackFila = fila.nextElementSibling;
    feedbackFila.children[0].textContent = blackPegs;
    feedbackFila.children[1].textContent = whitePegs;
}