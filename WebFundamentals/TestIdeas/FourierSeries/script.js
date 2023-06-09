// Get the canvas element
const canvas = document.getElementById("fourierCanvas")
const ctx = canvas.getContext("2d")

// Set the canvas dimensions
canvas.width = window.innerWidth
canvas.height = window.innerHeight

// Set the parameters
const amplitude = 100 // Amplitude of the square wave
const frequency = 1 // Frequency of the square wave
const harmonics = 10 // Number of harmonics

// Animation variables
let phase = 0
const animationSpeed = 0.01

// Function to draw the Fourier series approximation
function drawFourier() {
    const scale = 50 // Scaling factor for the visualization
    const xOffset = canvas.width / 2
    const yOffset = canvas.height / 2

    ctx.beginPath()
    ctx.moveTo(0, yOffset)

    // Iterate through each harmonic
    for (let n = 1; n <= harmonics; n++) {
        const radius = amplitude * (4 / (n * Math.PI)) * scale
        const angularFrequency = 2 * Math.PI * n * frequency
        let x = 0
        let y = 0

        // Calculate and draw the path
        for (let t = 0; t <= 2 * Math.PI; t += 0.01) {
            const prevX = x
            const prevY = y

            x += radius * Math.cos(angularFrequency * t + phase)
            y += radius * Math.sin(angularFrequency * t + phase)

            ctx.lineTo(xOffset + x, yOffset + y)

            // Connect the points with a line
            ctx.strokeStyle = "#FFF"
            ctx.stroke()

            // Draw the circle representing the harmonic
            ctx.beginPath()
            ctx.arc(xOffset + prevX, yOffset + prevY, radius, 0, 2 * Math.PI)
            ctx.strokeStyle = "rgba(255, 255, 255, 0.2)"
            ctx.stroke()
        }
    }
}

// Animation loop
function animate() {
    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Update the phase
    phase += animationSpeed

    // Draw the Fourier series approximation
    drawFourier()

    // Request the next animation frame
    requestAnimationFrame(animate)
}

// Start the animation
animate()
