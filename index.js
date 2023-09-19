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
    spriteSelection: {x: 164, y: 3072},
    dimentions: {x: 27, y: 32}
}

const spriteSheet = new Image()
spriteSheet.src = 'tiles.png'


const nowiSheet = new Image()
nowiSheet.src = 'nowisprite.png'

console.log(centro)

function crearCanvas(pixeles) {
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

    ctx.drawImage(spriteSheet, 192, 0, 64, 64, 128, 320, 64, 64);
    ctx.drawImage(spriteSheet, 128, 0, 64, 64, 128, 384, 64, 64);
    // ctx.drawImage(nowiSheet, 164, 3072, nowiSize.x, nowiSize.y, centro.x, centro.y, nowiSize.x, nowiSize.y)
    drawMySprite(ctx, nowiSheet, nowi.spriteSelection, centro, nowi.dimentions)

    ctx.moveTo(centro.x, centro.y)
    ctx.lineTo(centro.x + size, centro.y + size)


    ctx.closePath()
    ctx.strokeStyle = "#f00"
    ctx.stroke()
}

function drawMySprite(cntx, sprite, spriteSelection, positionInCanvas, dimentions) {
    cntx.drawImage(sprite, spriteSelection.x, spriteSelection.y, dimentions.x, dimentions.y, positionInCanvas.x, positionInCanvas.y, dimentions.x, dimentions.y)
}

function calcularCasillasYObtenerCentro() {
    const select = document.getElementById("tamTablero")

    pixeles = parseInt(select.value) + size
    pixelesTotales = pixeles + size

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

function nextTurn() {
    console.log(getRandomInt(4))
}

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}