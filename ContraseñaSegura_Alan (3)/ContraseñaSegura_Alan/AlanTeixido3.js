// Función para verificar y mostrar el resultado de la contraseña
function checkPassword() {
    // Obtener la contraseña y los elementos del resultado desde el DOM
    const password = document.getElementById('password').value;
    const result = document.getElementById('result');
    const printResult = document.getElementById('printResult');

    // Validar la contraseña
    const validationMessage = validatePassword(password);

    // Mostrar mensajes según la validación
    if (validationMessage === 'ok') {
        result.innerHTML = 'La contraseña es segura.';
        result.style.color = '#4caf50'; // Verde para indicar que es segura

        // Imprimir la contraseña solo si es segura
        printPassword(password);
    } else {
        result.innerHTML = 'La contraseña no cumple con todos los requisitos. Motivos:<br>' + validationMessage;
        result.style.color = '#f44336'; // Rojo para indicar que no cumple los requisitos

        // Reiniciar el área printResult si la contraseña no es segura
        printResult.textContent = '';
    }
}

// Función para validar la contraseña
function validatePassword(password) {
    const missingRequirements = [];

    // Verificar longitud
    if (!(password.length >= 8 && password.length <= 20)) {
        missingRequirements.push('La longitud debe estar entre 8 y 20 caracteres.');
    }

    // Verificar letras minúsculas
    if (countLowerCase(password) < 2) {
        missingRequirements.push('Debe contener al menos dos letras minúsculas.');
    }

    // Verificar letra mayúscula
    if (indexOfUpperCase(password) === -1) {
        missingRequirements.push('Debe contener al menos una letra mayúscula.');
    }

    // Verificar dígito
    if (indexOfDigit(password) === -1) {
        missingRequirements.push('Debe contener al menos un dígito.');
    }

    // Verificar caracteres iguales consecutivos
    if (hasConsecutiveCharacters(password)) {
        missingRequirements.push('No puede contener tres o más caracteres iguales seguidos.');
    }

    // Verificar espacios en blanco
    if (includesWhiteSpace(password)) {
        missingRequirements.push('No puede contener espacios en blanco.');
    }

    // Verificar carácter especial
    if (indexOfSpecialCharacter(password) === -1) {
        missingRequirements.push('Debe contener al menos un carácter especial.');
    }

    // Devolver un mensaje si hay requisitos faltantes, de lo contrario, 'ok'
    return missingRequirements.length === 0 ? 'ok' : missingRequirements.join('<br>');
}

// Funciones auxiliares para validar requisitos individuales

function countLowerCase(str) {
    let count = 0;
    for (let i = 0; i < str.length; i++) {
        if (str.charAt(i).toLowerCase() === str.charAt(i)) {
            count++;
        }
    }
    return count;
}

function indexOfUpperCase(str) {
    for (let i = 0; i < str.length; i++) {
        if (str.charAt(i).toUpperCase() === str.charAt(i)) {
            return i;
        }
    }
    return -1;
}

function indexOfDigit(str) {
    for (let i = 0; i < str.length; i++) {
        if (!isNaN(parseInt(str.charAt(i)))) {
            return i;
        }
    }
    return -1;
}

function hasConsecutiveCharacters(str) {
    for (let i = 0; i < str.length - 2; i++) {
        if (str.charAt(i) === str.charAt(i + 1) && str.charAt(i + 1) === str.charAt(i + 2)) {
            return true;
        }
    }
    return false;
}

function includesWhiteSpace(str) {
    return str.indexOf(' ') !== -1;
}

function indexOfSpecialCharacter(str) {
    const specialCharacters = '!@#$%^&*(),.?":{}|<>';

    for (let i = 0; i < str.length; i++) {
        if (specialCharacters.indexOf(str.charAt(i)) !== -1) {
            return i;
        }
    }
    return -1;
}

// Función para imprimir la contraseña si es segura
function printPassword(password) {
    const printResult = document.getElementById('printResult');
    printResult.textContent = 'Contraseña: ' + password;
}
