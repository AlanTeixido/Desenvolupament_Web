const MAX_INTENTOS = 10;
const MAX_COMBI_COLORES = 4;
const COLORS = ['white', 'blue', 'green', 'violet', 'yellow', 'red', 'orange', 'cyan'];
const GREY = "grey";
const WHITE = "white";
const BLACK = "black";

const master = [];
const userCombi = [];
var intento = 0;

document.addEventListener("DOMContentLoaded", function () {
    init();

    document.getElementById("btn-comprobar").addEventListener("click", Comprobar);
});

function init() {
    generarCodigoMaster();
    crearFilasJuego();
}

function generarCodigoMaster() {
    for (let i = 0; i < MAX_COMBI_COLORES; i++) {
        const colorIndex = Math.floor(Math.random() * COLORS.length);
        master.push(COLORS[colorIndex]);
    }
}

function crearFilasJuego() {
    const gameBoard = document.getElementById("game-board");

    for (let i = 0; i < MAX_INTENTOS; i++) {
        const row = document.createElement("div");
        row.innerHTML = ROW_RESULT;
        row.classList.add("game-row");
        gameBoard.appendChild(row);

        const userCombiCells = row.querySelectorAll(".celUserCombi");

        userCombiCells.forEach((cell, index) => {
            cell.addEventListener("click", function () {
                añadeColor(index);
            });
        });
    }
}

function añadeColor(index) {
    if (userCombi.length < MAX_COMBI_COLORES) {
        const selectedColor = COLORS[index];
        userCombi.push(selectedColor);

        const currentRow = document.querySelector(".game-row:nth-child(" + (intento + 1) + ")");
        const currentCell = currentRow.querySelector(".celUserCombi:nth-child(" + (userCombi.length) + ")");
        currentCell.style.backgroundColor = selectedColor;
    }
}

function Comprobar() {
    const currentRow = document.querySelector(".game-row:nth-child(" + (intento + 1) + ")");
    const feedbackRow = currentRow.nextElementSibling; // Obtener la fila de feedback

    // Lógica para comprobar la combinación
    const aciertos = calcularAciertos(userCombi, master);
    
    // Actualizar el resultado en la interfaz
    actualizarFeedback(feedbackRow, aciertos);
    
    // Incrementar el número de intentos
    intento++;

    // Verificar si el usuario ha ganado o agotado los intentos
    if (aciertos === MAX_COMBI_COLORES) {
        // El usuario ha adivinado la combinación, mostrar mensaje de victoria
        mostrarMensaje("¡Felicidades! Has adivinado la combinación secreta.");
    } else if (intento === MAX_INTENTOS) {
        // El usuario ha agotado los intentos, mostrar mensaje de derrota
        mostrarMensaje("Lo siento, has agotado todos los intentos. La combinación secreta era: " + master.join(", "));
    }
    
    // Limpiar la combinación del usuario para el próximo intento
    userCombi.length = 0;
}

function calcularAciertos(intentoUsuario, codigoMaster) {
    let aciertos = 0;

    for (let i = 0; i < MAX_COMBI_COLORES; i++) {
        if (intentoUsuario[i] === codigoMaster[i]) {
            aciertos++;
        }
    }

    return aciertos;
}

function actualizarFeedback(feedbackRow, aciertos) {
    const feedbackCells = feedbackRow.querySelectorAll(".cercleResult");

    for (let i = 0; i < aciertos; i++) {
        feedbackCells[i].style.backgroundColor = BLACK;
    }

    for (let i = aciertos; i < MAX_COMBI_COLORES; i++) {
        feedbackCells[i].style.backgroundColor = WHITE;
    }
}

function mostrarMensaje(mensaje) {
    // Puedes implementar la lógica para mostrar el mensaje de victoria o derrota en tu interfaz.
    document.getElementById("mensaje").textContent = mensaje;
}

/** Template con el código HTML que corresponde a cada fila de juego/intento. */
const ROW_RESULT = `<div class="rowResult w100 flex wrap">
    <div class="rowUserCombi w75 flex wrap">
       <div class="w25">
           <div class="celUserCombi flex"></div>
       </div>
       <div class="w25">
           <div class="celUserCombi flex"></div>
       </div>
       <div class="w25">
           <div class="celUserCombi flex"></div>
       </div>
       <div class="w25">
           <div class="celUserCombi flex"></div>
       </div>
    </div>
    <div class="rowCercleResult w25 flex wrap center">
       <div class="w40 h40">
            <div class="cercleResult flex"></div>
       </div>
       <div class="w40 h40">
           <div class="cercleResult flex"></div>
       </div>
       <div class="w40 h40">
           <div class="cercleResult flex"></div>
       </div>
       <div class="w40 h40">
           <div class="cercleResult flex"></div>
       </div>
    <div>
</div>`;
