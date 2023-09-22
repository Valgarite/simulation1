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
let canvas = document.getElementById("tablero")

const nowi = {
    spriteSelection: { x: 164, y: 3072 },
    dimentions: { x: 27, y: 32 }
}

const spriteSheet = new Image()
spriteSheet.src = 'tiles.png'


const nowiSheet = new Image()
nowiSheet.src = 'nowisprite.png'

console.log(centro)

async function crearCanvas(pixeles) {
    console.log(pixeles)
    console.log(pixelesTotales)

    const ctx = canvas.getContext("2d")
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath()

    for (let index = 0; index <= pixelesTotales; index = index + size) {
        ctx.moveTo(index, 0)
        ctx.lineTo(index, pixelesTotales)
        ctx.moveTo(0, index)
        ctx.lineTo(pixelesTotales, index)
    }

    await ctx.drawImage(spriteSheet, 192, 0, 64, 64, 128, 320, 64, 64);
    await ctx.drawImage(spriteSheet, 128, 0, 64, 64, 128, 384, 64, 64);
    // ctx.drawImage(nowiSheet, 164, 3072, nowiSize.x, nowiSize.y, centro.x, centro.y, nowiSize.x, nowiSize.y)
    drawMySprite(ctx, nowiSheet, nowi.spriteSelection, centro, nowi.dimentions)

    ctx.moveTo(centro.x, centro.y)
    ctx.lineTo(centro.x + size, centro.y + size)


    ctx.closePath()
    ctx.strokeStyle = "#f00"
    await ctx.stroke()
}

function drawMySprite(cntx, sprite, spriteSelection, positionInCanvas, dimentions) {
    cntx.drawImage(sprite, spriteSelection.x, spriteSelection.y, dimentions.x, dimentions.y, positionInCanvas.x, positionInCanvas.y, dimentions.x, dimentions.y)
}

function calcularCasillasYObtenerCentro() {
    pixeles = 640 + size
    pixelesTotales = pixeles + size
    console.log(pixeles, pixelesTotales)
    casillas = pixeles / size

    canvas.width = pixeles
    canvas.height = pixeles

    centro = {
        x: pixelesTotales / 2 - size,
        y: pixelesTotales / 2 - size
    }
    console.log(centro.x / size, centro.y / size)

    document.getElementById("casillasInf").innerText = "Cantidad de casillas: " + casillas
    console.log(pixeles)
    console.log(casillas)

    crearCanvas(pixeles)
}

function laMagia() {
    const cantidad = document.getElementById("movimientos")
    const simulaciones = getMovimientos(parseInt(cantidad.value))
    console.log(simulaciones)
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

function pruebalol() {
    const coso = document.getElementById("movimientos")
    console.log(coso.value)
}

calcularCasillasYObtenerCentro()