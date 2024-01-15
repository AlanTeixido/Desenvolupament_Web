function checkPassword() {
    const password = document.getElementById('password').value;
    const result = document.getElementById('result');
    const printResult = document.getElementById('printResult');

    const validationMessage = validatePassword(password);

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



function validatePassword(password) {
    const missingRequirements = [];

    if (!(password.length >= 8 && password.length <= 20)) {
        missingRequirements.push('La longitud debe estar entre 8 y 20 caracteres.');
    }

    if (!( /[a-z].*[a-z]/ ).test(password)) {
        missingRequirements.push('Debe contener al menos dos letras minúsculas.');
    }

    if (!( /[A-Z]/ ).test(password)) {
        missingRequirements.push('Debe contener al menos una letra mayúscula.');
    }

    if (!( /[0-9]/ ).test(password)) {
        missingRequirements.push('Debe contener al menos un dígito.');
    }

    if (( /(.)\1\1/ ).test(password)) {
        missingRequirements.push('No puede contener tres o más caracteres iguales seguidos.');
    }

    if (( / / ).test(password)) {
        missingRequirements.push('No puede contener espacios en blanco.');
    }

    if (!( /[!@#$%^&*(),.?":{}|<>]/ ).test(password)) {
        missingRequirements.push('Debe contener al menos un carácter especial.');
    }

    return missingRequirements.length === 0 ? 'ok' : missingRequirements.join('<br>');
}

function printPassword(password) {
    const validationMessage = validatePassword(password);

    if (validationMessage === 'ok') {
        const printResult = document.getElementById('printResult');
        printResult.textContent = 'Contraseña: ' + password;
    }
}
