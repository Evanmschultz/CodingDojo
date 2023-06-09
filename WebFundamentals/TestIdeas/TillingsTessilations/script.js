// Get the canvas element
const canvas = document.getElementById("tilingCanvas")
const ctx = canvas.getContext("2d")

// Set the canvas dimensions
canvas.width = window.innerWidth
canvas.height = window.innerHeight

// Set the Penrose tile parameters
const scale = 100 // Scaling factor for the tiles
const initialPoints = [
    { x: 0, y: 0 },
    { x: 2, y: 0 },
    { x: 1, y: 1 },
] // Initial triangle points

// Penrose tile transformation rules
const transformations = [
    {
        a: 0.5,
        b: -0.5,
        c: 0.5,
        d: 0.5,
        e: 0,
        f: 0,
    },
    {
        a: 0.5,
        b: 0.5,
        c: -0.5,
        d: 0.5,
        e: 1,
        f: 0,
    },
]

// Generate Penrose tiles using the transformation rules
function generateTiles(level) {
    const tiles = []

    function applyTransformation(point, transformation) {
        const { a, b, c, d, e, f } = transformation
        const { x, y } = point

        const newX = a * x + b * y + e
        const newY = c * x + d * y + f

        return { x: newX, y: newY }
    }

    function generate(level, point) {
        if (level === 0) {
            tiles.push(point)
        } else {
            for (const transformation of transformations) {
                const newPoint = applyTransformation(point, transformation)
                generate(level - 1, newPoint)
            }
        }
    }

    for (const point of initialPoints) {
        generate(level, point)
    }

    return tiles
}

// Animation variables
let rotationAngle = 0
const rotationSpeed = 0.01
const maxLevel = 6

// Function to draw the Penrose tiles
function drawTiles(tiles) {
    const xOffset = canvas.width / 2
    const yOffset = canvas.height / 2

    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.translate(xOffset, yOffset)
    ctx.rotate(rotationAngle)

    for (const { x, y } of tiles) {
        ctx.beginPath()
        ctx.moveTo(scale * x, scale * y)
        ctx.lineTo(scale * (x + 1), scale * y)
        ctx.lineTo(scale * (x + 0.5), scale * (y + 1))
        ctx.closePath()

        ctx.strokeStyle = "#FFF"
        ctx.stroke()
    }

    ctx.rotate(-rotationAngle)
    ctx.translate(-xOffset, -yOffset)
}

// Animation loop
function animate() {
    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Generate the Penrose tiles for the current level
    const level = Math.floor(rotationAngle / (Math.PI / 2)) % (maxLevel + 1)
    const tiles = generateTiles(level)

    // Draw the Penrose tiles
    drawTiles(tiles)

    // Update the rotation angle
    rotationAngle += rotationSpeed

    // Request the next animation frame
    requestAnimationFrame(animate)
}

// Start the animation
animate()
