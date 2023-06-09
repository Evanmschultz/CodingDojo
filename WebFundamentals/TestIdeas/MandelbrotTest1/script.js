let canvas = document.getElementById("canvas")
let ctx = canvas.getContext("2d")

// set canvas size
let canvasSize =
    window.innerHeight > window.innerWidth
        ? window.innerWidth
        : window.innerHeight
canvas.width = canvasSize
canvas.height = canvasSize

// Mandelbrot parameters
let zoom = 1
let zoomSpeed = 20
let maxIter = 100
let xCenter = -0.75 // adjusted center
let yCenter = 0.1 // adjusted center

function draw() {
    for (let x = 0; x < canvas.width; x++) {
        for (let y = 0; y < canvas.height; y++) {
            let zx =
                (1.5 * (x - canvas.width / 2)) / (0.5 * zoom * canvas.width) +
                xCenter
            let zy =
                (y - canvas.height / 2) / (0.5 * zoom * canvas.height) + yCenter
            let cX = zx
            let cY = zy
            let iter = maxIter
            while (zx * zx + zy * zy <= 4 && iter > 0) {
                let tmp = zx * zx - zy * zy + cX
                zy = 2.0 * zx * zy + cY
                zx = tmp
                iter--
            }
            let color = iter === 0 ? "#000" : `hsl(0, 100%, ${iter}%)`
            ctx.fillStyle = color
            ctx.fillRect(x, y, 1, 1)
        }
    }
    zoom += zoomSpeed
    requestAnimationFrame(draw)
}

draw()
