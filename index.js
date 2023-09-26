//Hecho por Carlos Gutiérrez V30.064.934 para Simulación de Sistemas en la sección N1113

var casillas = 0
var pixeles = 0
var size = 32
var pixelesTotales
var centro = { x: 0, y: 0 }
var exitos = 0
var simulacionesTotales = 0
var simsMovimientos = []
const canvas = document.getElementById("tablero")
const canvas2 = document.getElementById("layer-movimientos")
const canvas3 = document.getElementById("sprites")

const rick = new Image()
rick.src = "rick.png"
const beer = new Image()
beer.src = "beer.png"

var simulacionesDibujo

calcularCasillasYObtenerCentro()
laMagia()

function laMagia() {
    const cantidad = parseInt(document.getElementById("movimientos").value)
    const movidas = getMovimientos(cantidad)
    simsMovimientos = movidas
    simulacionesTotales = cantidad
    //console.log(movidas)
    const simMovidas = movimientoAPixeles(centro.x, centro.y, movidas)
    // console.log(simMovidas)
    // conseguirFinal(simMovidas)
    simulacionesDibujo = pixelInicioDibujo(simMovidas)
    // console.log(simulacionesDibujo)
    llenarListaSimulaciones(simulacionesDibujo)
}

function crearCanvas() {
    const ctx = canvas.getContext("2d")

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath()

    for (let index = 0; index <= pixelesTotales; index = index + size) {
        ctx.moveTo(index, 0)
        ctx.lineTo(index, pixelesTotales)
        ctx.moveTo(0, index)
        ctx.lineTo(pixelesTotales, index)
    }

    ctx.moveTo(centro.x, centro.y)
    ctx.lineTo(centro.x + size, centro.y + size)
    ctx.closePath()
    ctx.strokeStyle = "#f00"
    return ctx.stroke()
}

function dibujarSimulacion(selection) {
    const ctx = canvas2.getContext("2d")

    ctx.clearRect(0, 0, canvas2.width, canvas2.height);
    const seleccionada = simulacionesDibujo[selection]
    // console.log(seleccionada)
    const posFinal = seleccionada[seleccionada.length - 1]
    // console.log(posFinal)
    const copyCat = document.getElementById("copycat")
    const copied = document.getElementById("sim#" + selection)
    copyCat.innerHTML = copied.innerHTML
    copyCat.className = copied.className
    copyCat.focus()

    const listaDirecciones = document.getElementById("direcciones")
    const dirInversa = simsMovimientos[selection].map((movida) => {
        // console.log(movida)
        if (movida == "S") {
            return "N"
        } else if (movida == "N") {
            return "S"
        }else{
            return movida
        }
    })
    // console.log(dirInversa)
    listaDirecciones.innerText = "Direcciones tomadas: " + dirInversa

    seleccionada.forEach((pos, i) => {
        const nextPos = seleccionada[i + 1]
        ctx.beginPath()
        try {
            ctx.moveTo(pos.x, pos.y)
            ctx.lineTo(nextPos.x, nextPos.y)
        } catch (error) {
            // console.log(error)
        }
        ctx.strokeStyle = `rgb(0, ${0 + 255 * i * 0.1}, ${255 - 255 * i * 0.1})`
        ctx.closePath()
        return ctx.stroke()
    })
    // console.log(posFinal)
    const cntx = canvas3.getContext("2d")
    cntx.beginPath()
    cntx.clearRect(0, 0, pixelesTotales, pixelesTotales)
    drawMySprite(cntx, rick, { x: 0, y: 0 }, posFinal, { x: 105, y: 140 })
    drawMySprite(cntx, beer, { x: 0, y: 0 }, { x: centro.x + 16, y: centro.y + 16 }, { x: 32, y: 32 }) //seguro hay una forma más bonita de pasar algunos parámetros pero no me voy a poner a hacerlo XD
    cntx.closePath()

    return
}

function pixelInicioDibujo(simulaciones) {
    const sumas = simulaciones.map(simulacion => {
        // console.log(simulacion)
        return simulacion.map(coordenadas => {
            // console.log(coordenadas)
            return {
                x: coordenadas.x + size / 2,
                y: coordenadas.y + size / 2
            }
        })
    })
    return sumas
}

function drawMySprite(ctx, sprite, spriteSelection, positionInCanvas, dimentions) {
    // console.log("dibujando en: ", positionInCanvas)
    ctx.drawImage(sprite, spriteSelection.x, spriteSelection.y, dimentions.x, dimentions.y, positionInCanvas.x - size / 2, positionInCanvas.y - size / 2, size, size)
    return
}

function calcularCasillasYObtenerCentro() {
    pixeles = size * 21 //672
    pixelesTotales = pixeles + size
    //console.log(pixeles, pixelesTotales)
    casillas = pixeles / size

    centro = {
        x: pixelesTotales / 2 - size,
        y: pixelesTotales / 2 - size
    }
    //console.log(centro.x / size, centro.y / size)

    // document.getElementById("casillasInf").innerText = "Cantidad de casillas: " + casillas
    //console.log(pixeles)
    //console.log(casillas)

    contextoooo = crearCanvas()
}

function getMovimientos(cant) {
    const sims = []
    for (let i = 0; i < cant; i++) {
        const result = []
        for (let j = 0; j < 10; j++) {
            result.push(Math.floor(Math.random() * 4))
        }
        sims.push(result)
    }

    return sims.map((element) => {
        const movimiento = element.map((numero) => {
            switch (numero) {
                //Norte, Sur, Este, Oeste
                case 0:
                    return "N"
                case 1:
                    return "S"
                case 2:
                    return "E"
                case 3:
                    return "O"
                default:
                    break;
            }
        }
        )
        return movimiento
    })
}

function movimientoAPixeles(xInicial, yInicial, simulaciones) {
    const resultado = simulaciones.map(cardinales => {
        let movs = [{
            x: xInicial,
            y: yInicial
        }]
        //console.log(cardinales)
        cardinales.forEach((cardinal) => {
            const ultimo = movs.length - 1
            switch (cardinal) {
                case "N":
                    movs.push({
                        x: movs[ultimo].x,
                        y: movs[ultimo].y + size,
                    })
                    break;
                case "S":
                    movs.push({
                        x: movs[ultimo].x,
                        y: movs[ultimo].y - size,
                    })
                    break;
                case "E":
                    movs.push({
                        x: movs[ultimo].x + size,
                        y: movs[ultimo].y,
                    })
                    break;
                case "O":
                    movs.push({
                        x: movs[ultimo].x - size,
                        y: movs[ultimo].y,
                    })
                    break;
                default:
                    //console.log("error lol")
                    break;
            }
            //// console.log(movs)
        })
        return movs
    })
    return resultado
}

function llenarListaSimulaciones(sims) {
    const listaSimulaciones = document.getElementById('lista-simulaciones')
    listaSimulaciones.innerHTML = "" //Vaciado

    exitos = 0

    sims.forEach((simulacion, i) => {
        const sim = simulacion[simulacion.length - 1]
        const option = document.createElement('li');
        const cateto1 = sim.x - size * 10 - size / 2
        const cateto2 = sim.y - size * 10 - size / 2
        const desplazamiento = (Math.abs(cateto1) + Math.abs(cateto2)) / size

        option.innerHTML = `<h5>SIM # ${(i + 1)}</h5>
        <h6>Posición final: ${((sim.x - size * 10) / size - 0.5)}, ${((sim.y - size * 10) / size - 0.5) * -1}</h6>
        <h6>Desplazamiento desde el bar: ${desplazamiento}</h6>`
        if (desplazamiento == 2) {
            exitos += 1
        }
        option.className = "sim-card"
        option.id = "sim#" + i
        option.addEventListener("click", (event) => { dibujarSimulacion(i) })
        listaSimulaciones.append(option)
    });

    //el clg más útil de la galaxia:
    // console.log(exitos, simulacionesTotales)
    const mensajeProb = document.getElementById("casillaInf1")
    const mensajeRes = document.getElementById("casillaInf2")
    try {
        const res = Math.floor(exitos / simulacionesTotales * 100)
        mensajeProb.innerText = "Probabilidades de haber quedado a dos casillas: " + res + "%"
        mensajeRes.innerText = "Simulaciones que quedaron a dos casillas: " + exitos
    } catch (error) {
        console.log(error)
    }
}

// Obtener el campo de entrada
const input = document.getElementById("movimientos");

// Agregar un evento de escucha para el evento "input"
input.addEventListener("input", function () {
    // Obtener el valor ingresado por el usuario
    const value = parseInt(input.value);

    // Validar si el valor cumple con los criterios
    if (isNaN(value) || value > 1000) {
        input.value = 0
    } else if (value < 0) {
        input.value = 1000
    }
});
