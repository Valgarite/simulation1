//TODO:
//+FUNCIÓN QUE CAMBIE TAMAÑO DEL TABLERO Y ACTUALICE EL DOM. HECHO
//+REALIZAR LA SIMULACIÓN
//+CALCULAR LA PROBABILIDAD
//+PONERLO MÁS BONITO CLARO QUE SÍ
//+SI ME SOBRA EL TIEMPO HACER CADA MOVIMIENTO ANIMADO
var casillas = 0
var pixeles = 0
var size = 32
var pixelesTotales
var centro = { x: 0, y: 0 }
const canvas = document.getElementById("tablero")
const canvas2 = document.getElementById("layer_movimientos")

const nowi = {
    spriteSelection: { x: 164, y: 3072 },
    dimentions: { x: 27, y: 32 }
}

const spriteSheet = new Image()
spriteSheet.src = 'tiles.png'


const nowiSheet = new Image()
nowiSheet.src = 'nowisprite.png'

var simulacionesDibujo
//console.log(centro)

calcularCasillasYObtenerCentro()
laMagia()

function laMagia() {
    const cantidad = document.getElementById("movimientos")
    const movidas = getMovimientos(parseInt(cantidad.value))
    //console.log(movidas)
    const simMovidas = movimientoAPixeles(centro.x, centro.y, movidas)
    console.log(simMovidas)
    conseguirFinal(simMovidas)
    simulacionesDibujo = pixelInicioDibujo(simMovidas)
    console.log(simulacionesDibujo)
    llenar_lista_simulaciones(simulacionesDibujo)
    //descomentar para probar:
    // dibujarSimulacion(simulacionesDibujo, 0) //cambiar índice 0 por el valor de la carta escogida
    // dibujarMovimiento(simMovidas, 0)
    // dibujarMovimiento(simMovidas, 1)
}

function crearCanvas() {
    //console.log(pixeles)
    //console.log(pixelesTotales)

    const ctx = canvas.getContext("2d")

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath()

    for (let index = 0; index <= pixelesTotales; index = index + size) {
        ctx.moveTo(index, 0)
        ctx.lineTo(index, pixelesTotales)
        ctx.moveTo(0, index)
        ctx.lineTo(pixelesTotales, index)
    }

    ctx.drawImage(spriteSheet, 192, 0, 64, 64, 128, 320, 64, 64);
    ctx.drawImage(spriteSheet, 128, 0, 64, 64, 128, 384, 64, 64);
    // ctx.drawImage(nowiSheet, 164, 3072, nowiSize.x, nowiSize.y, centro.x, centro.y, nowiSize.x, nowiSize.y)
    drawMySprite(ctx, nowiSheet, nowi.spriteSelection, centro, nowi.dimentions)

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
    console.log(seleccionada)
    seleccionada.forEach((sim, i) => {
        ctx.beginPath()
        console.log(sim)
        ctx.moveTo(sim.x, sim.y)
        ctx.lineTo(seleccionada[i + 1].x, seleccionada[i + 1].y)

        ctx.strokeStyle = "#0f0"
        ctx.closePath()
        return ctx.stroke()
    })
    return
}

function conseguirFinal(simulaciones) {
    simulaciones.forEach(movidas => {
        const final = movidas[movidas.length - 1]
        console.log("Casilla final: (", final.x / 32, ", ", final.y / 32, ")")
    });
}

function pixelInicioDibujo(simulaciones) {
    const sumas = simulaciones.map(simulacion => {
        // console.log(simulacion)
        return simulacion.map(coordenadas => {
            // console.log(coordenadas)
            return {
                x: coordenadas.x,
                y: coordenadas.y + 32
            }
        })
    })
    return sumas
}

function drawMySprite(cntx, sprite, spriteSelection, positionInCanvas, dimentions) {
    cntx.drawImage(sprite, spriteSelection.x, spriteSelection.y, dimentions.x, dimentions.y, positionInCanvas.x, positionInCanvas.y, dimentions.x, dimentions.y)
}

function calcularCasillasYObtenerCentro() {
    pixeles = 672
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
                        y: movs[ultimo].y + 32,
                    })
                    break;
                case "S":
                    movs.push({
                        x: movs[ultimo].x,
                        y: movs[ultimo].y - 32,
                    })
                    break;
                case "E":
                    movs.push({
                        x: movs[ultimo].x + 32,
                        y: movs[ultimo].y,
                    })
                    break;
                case "O":
                    movs.push({
                        x: movs[ultimo].x - 32,
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

function llenar_lista_simulaciones(sims) {
    const lista_simulaciones = document.getElementById('lista_simulaciones')

    //TODO: arreglar este bucle y averiguar porqué no sirve
    while (1 < lista_simulaciones.length) {
        //Este bucle vacía las opciones del select en cada cambio.
        lista_simulaciones.remove(1)
    }

    sims.forEach((simulacion, i) => {
        const sim = simulacion[simulacion.length - 1]
        const option = document.createElement('li');
        option.innerText = 'SIM #' + (i + 1) + ': ' + (sim.x / 32) + ", " + (sim.y / 32)
        option.value = i
        option.addEventListener("onclick", (event) => { console.log(i); dibujarSimulacion(i) })
        lista_simulaciones.append(option)
    });
}