// Get the canvas element
const canvas = document.getElementById("waveCanvas")
const ctx = canvas.getContext("2d")

// Set the canvas dimensions
canvas.width = window.innerWidth
canvas.height = window.innerHeight

// Generate random waves
const waves = []
const waveCount = 15

for (let i = 0; i < waveCount; i++) {
    const xOffset = Math.random() * canvas.width
    const yOffset = Math.random() * canvas.height
    const speed = Math.random() * 0.01 + 0.001
    const amplitude = Math.random() * 100 + 20
    const frequency = Math.random() * 0.02 + 0.005

    waves.push({ xOffset, yOffset, speed, amplitude, frequency })
}

// Animation variables
const rotationSpeed = 0.01

// Function to draw the waves
function drawWaves() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    for (let i = 0; i < waveCount; i++) {
        const { xOffset, yOffset, speed, amplitude, frequency } = waves[i]

        ctx.beginPath()

        // Draw the sine wave
        ctx.moveTo(xOffset, yOffset + amplitude * Math.sin(speed))
        for (let x = 0; x <= canvas.width; x += 1) {
            ctx.lineTo(x, yOffset + amplitude * Math.sin(speed + frequency * x))
        }

        ctx.strokeStyle = "rgb(90,90,90)"
        ctx.stroke()

        // Draw the cosine wave
        ctx.beginPath()
        ctx.moveTo(xOffset, yOffset + amplitude * Math.cos(speed))
        for (let x = 0; x <= canvas.width; x += 1) {
            ctx.lineTo(x, yOffset + amplitude * Math.cos(speed + frequency * x))
        }

        ctx.strokeStyle = "rgb(200, 200, 200)"
        ctx.stroke()

        // Update wave speed
        waves[i].speed += rotationSpeed
    }
}

// Animation loop
function animate() {
    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Draw the waves
    drawWaves()

    // Request the next animation frame
    requestAnimationFrame(animate)
}

// Start the animation
animate()
