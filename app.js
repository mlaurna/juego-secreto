let numeroSecreto = 0;
let intento = 0;
let numeroMaximo = 10;
let listaNumerosSorteados = [];

//Función que simplifica la asignación de texto a elemento HTML
function asignarTextoElemento(elemento, texto) {
    //Selecciona el elemento HTML y lo almacena en una variable
    let elementoHTML = document.querySelector(elemento);
    //Asigna el texto al elemento HTML
    elementoHTML.innerHTML = texto;
    return;
}

//Realiza la lógica del juego
function verificarIntento() {
    //Toma el valor que coloca el usuario en el botón y lo almacena en la variable
    let numeroUsuario = parseInt(document.getElementById('valorUsuario').value);
    
    //Si el usuario acertó
    if (numeroUsuario === numeroSecreto) {
        asignarTextoElemento('p', `${intento === 1 ? 'Felicidades! Acertaste el número secreto a la primera' : `Acertaste el número secreto en ${intento} intentos`}`);
        document.getElementById('reiniciar').removeAttribute('disabled');
        document.getElementById('intentar').setAttribute('disabled', 'true');
    } else {
        //Si el usuario no acertó
        if (numeroUsuario < numeroSecreto) {
            asignarTextoElemento('p', 'El número secreto es mayor');
        } else {
            asignarTextoElemento('p', 'El número secreto es menor');
        }
        intento++;
        limpiarCaja();
    }
    return;
}

//Genera un número pseudo-aleatorio
function generarNumeroSecreto() {
    let numeroGenerado = Math.floor(Math.random() * numeroMaximo) + 1;
    console.log(numeroGenerado);
    console.log(listaNumerosSorteados);

    if (listaNumerosSorteados.length === numeroMaximo) {
        asignarTextoElemento('p', 'Ya se sortaron todos los números posibles')
    } else {
        if (listaNumerosSorteados.includes(numeroGenerado)) {
            return generarNumeroSecreto();
        } else {
            listaNumerosSorteados.push(numeroGenerado);
            return numeroGenerado;
        }
    }
}

//Limpiar caja
function limpiarCaja() {
    return document.querySelector('#valorUsuario').value = '';
}

//Prepara el juego para jugar desde el principio
function condicionesIniciales() {
    limpiarCaja();
    //Mensajes iniciales
    asignarTextoElemento('h1','Juego del número secreto');
    asignarTextoElemento('p',`Indica un número del 1 al ${numeroMaximo}`);
    numeroSecreto = generarNumeroSecreto();
    //Contador intentos
    intento = 1;
}

function reiniciarJuego() {
    condicionesIniciales();
    //Deshabilita el botón "Nuevo juego"
    document.getElementById('reiniciar').setAttribute('disabled', 'true');
    //Habilita el botón "Intentar"
    document.getElementById('intentar').removeAttribute('disabled');
}

//Realiza las condiciones necesarias para inicializar el juego
condicionesIniciales();