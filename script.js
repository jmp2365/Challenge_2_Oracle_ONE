/* 
    Juego del Ahorcado
    Variables y funciones
*/

var listaPalabrasSecretas = ["HTML", "SCRIPT", "STYLE", "ALURA", "ORACLE",
                    "INTERNET", "ARCHIVO", "DESAFIO", "IMPRIMIR", "EDITOR"];

var palabraElegida = escogerPalabra();
var teclaPresionada = "";
var cantidadAciertos = 0;
var cantidadErrores = 0;
var letrasErradas = "";
var letrasAcertadas = "";


document.removeEventListener('keydown', teclaEsLetra);

function escogerPalabra() {
    return listaPalabrasSecretas[Math.round(Math.random()*(listaPalabrasSecretas.length - 1))];
}

function crearTablero() {
    var canvas = document.getElementById('canvas');
    canvas.setAttribute('width', window.innerWidth);
    canvas.setAttribute('height', window.innerHeight);
    var ctx = canvas.getContext('2d');
    ctx.fillStyle = '#E5E5E5';
    ctx.fillRect(0,0,canvas.width, canvas.height);
    mostrarGuiones(palabraElegida.length);
}

function mostrarGuiones(cantidad) {
    document.getElementById("init").style.visibility = "hidden";
    document.getElementById("addWord").style.visibility = "hidden";
    document.getElementById("new").style.visibility = "visible";
    document.getElementById("quit").style.visibility = "visible";

    var context=document.getElementById("canvas").getContext("2d");
    context.fillStyle="#0A3871";
    x0 = (985 - cantidad*63)/2;
    for (let index = 0; index < cantidad; index++) {
        context.fillRect(x0, 450, 58, 3);
        x0 += 63;
    }
}

function dibujarLetraCorrecta(letra, posicion) {
    var context=document.getElementById("canvas").getContext("2d");
    context.fillStyle="#0A3871";
    context.font="35px Arial";
    x0 = (985 - palabraElegida.length*63)/2;
    context.fillText(letra, x0+63*posicion+15, 440);    
}

function dibujarLetraIncorrecta(letra, posicion) {
    var context=document.getElementById("canvas").getContext("2d");
    context.fillStyle="#0A3871";
    context.font="25px Arial";
    context.fillText(letra, 400+30*posicion, 520);    
}

function teclaEsLetra(e) {
    if (e.keyCode>=65 && e.keyCode<=90) {
        teclaPresionada = String.fromCharCode(e.keyCode);
        var newLetter = true;
        for (let index = 0; index < letrasErradas.length; index++) {
            if (teclaPresionada == letrasErradas[index]) {
                newLetter = false;
                break;
            }    
        }
        for (let index = 0; index < letrasAcertadas.length; index++) {
            if (teclaPresionada == letrasAcertadas[index]) {
                newLetter = false;
                break;
            }    
        }

        if (newLetter) {
            var acertada = false;
            for (let index = 0; index < palabraElegida.length; index++) {
                if (teclaPresionada == palabraElegida[index]) {
                    dibujarLetraCorrecta(teclaPresionada, index);
                    letrasAcertadas += teclaPresionada;
                    cantidadAciertos++;
                    acertada = true;    
                }
            }
            if (!acertada) {
                dibujarLetraIncorrecta(teclaPresionada, letrasErradas.length);
                letrasErradas += teclaPresionada;
                dibujarHorca(letrasErradas.length)
                cantidadErrores++;
            }
        }
        if (finDeJuego()) {
            dibujarMsjFinDeJuego();
            develarPalabra();
            document.removeEventListener('keydown', teclaEsLetra); 
        }
        if (verificarGanador()) {
            dibujarMsjGanador();
            document.removeEventListener('keydown', teclaEsLetra);
        }
    }
}

function finDeJuego() {
    return (cantidadErrores == 10);
}

function dibujarMsjFinDeJuego() {
    var context=document.getElementById("canvas").getContext("2d");
    context.fillStyle="red";
    context.font="25px Arial";
    context.fillText("Fin del juego!", 650, 250);    
}

function verificarGanador() {
    return (cantidadAciertos == palabraElegida.length);
}

function dibujarMsjGanador() {
    var context=document.getElementById("canvas").getContext("2d");
    context.fillStyle="green";
    context.font="25px Arial";
    context.fillText("Ganaste,", 650, 250);  
    context.fillText("Felicidades!", 635, 280);  
}

function agregarPalabra() {
    document.getElementById("init").style.visibility = "hidden";
    document.getElementById("addWord").style.visibility = "hidden";
    document.getElementById("canvas").style.visibility = "hidden";
    document.getElementById("guardar").style.visibility = "visible";
    document.getElementById("cancelar").style.visibility = "visible";
    document.getElementById("input-txt").style.visibility = "visible";
    document.getElementById("max-8").style.visibility = "visible";
}

function guardarPalabra() {
    listaPalabrasSecretas.push(document.getElementById("input-txt").value);
    iniciarJgo();
}

function nuevoJuego() {
    iniciarJgo();    
}

function develarPalabra() {
    var context=document.getElementById("canvas").getContext("2d");
    context.fillStyle="red";
    context.font="25px Arial";
    context.fillText("La palabra secreta era:  "+palabraElegida, 400, 480);    
}

function iniciarJgo() {
    palabraElegida = escogerPalabra();
    cantidadAciertos = 0;
    cantidadErrores = 0;
    letrasErradas = "";
    letrasAcertadas = "";

    document.getElementById("canvas").style.visibility = "visible";
    document.getElementById("guardar").style.visibility = "hidden";
    document.getElementById("cancelar").style.visibility = "hidden";
    document.getElementById("input-txt").style.visibility = "hidden";
    document.getElementById("max-8").style.visibility = "hidden";
    document.getElementById("new").style.visibility = "visible";
    document.getElementById("quit").style.visibility = "visible";
    crearTablero();
    document.addEventListener('keydown', teclaEsLetra);
}

function dibujarHorca(etapa) {
    var context=document.getElementById("canvas").getContext("2d");
    context.fillStyle="#0A3871";
    x0 = 400;
    y0 = 100;
    if(etapa == 1) {  //base
        context.fillRect(x0, y0+250, 220, 3);
    }else if(etapa == 2) { //poste vertical
        context.fillRect(x0+60, y0+50, 3, 200);
    }else if(etapa == 3) { //poste horizontal
        context.fillRect(x0+60, y0+50, 120, 3);
    }else if(etapa == 4) { //soga
        context.fillRect(x0+180, y0+50, 3, 30);
    }else if(etapa == 5) { //cabeza
        context.beginPath();
        context.arc(x0+181, y0+102, 22, 0, 2*3.14);
        context.fill();
        context.fillStyle="#E5E5E5";
        context.beginPath();
        context.arc(x0+181, y0+102, 19, 0, 2*3.14);
        context.fill();
    }else if(etapa == 6) { //cuerpo
        context.fillRect(x0+180, y0+121, 3, 80);
    }else if(etapa == 7) { //brazo der
        context.beginPath();
        context.moveTo(x0+180, y0+141);
        context.lineTo(x0+200, y0+181);
        context.lineTo(x0+204, y0+181);
        context.lineTo(x0+184, y0+141);
        context.moveTo(x0+180, y0+141);
        context.fill();
    }else if(etapa == 8) { //brazo izq
        context.beginPath();
        context.moveTo(x0+183, y0+141);
        context.lineTo(x0+163, y0+181);
        context.lineTo(x0+159, y0+181);
        context.lineTo(x0+179, y0+141);
        context.moveTo(x0+183, y0+141);
        context.fill();
    }else if(etapa == 9) { //pierna der
        context.beginPath();
        context.moveTo(x0+180, y0+201);
        context.lineTo(x0+200, y0+241);
        context.lineTo(x0+204, y0+241);
        context.lineTo(x0+184, y0+201);
        context.moveTo(x0+180, y0+201);
        context.fill();
    }else if(etapa == 10) { //pierna izq
        context.beginPath();
        context.moveTo(x0+183, y0+201);
        context.lineTo(x0+163, y0+241);
        context.lineTo(x0+159, y0+241);
        context.lineTo(x0+179, y0+201);
        context.moveTo(x0+183, y0+201);
        context.fill();
    }
}
