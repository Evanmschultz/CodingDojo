// Get the canvas element
const canvas = document.getElementById("sortingCanvas")
const ctx = canvas.getContext("2d")

// Set the canvas dimensions
canvas.width = window.innerWidth
canvas.height = window.innerHeight

// Array properties
const arrayLength = 100 // Number of elements in the array
const barWidth = canvas.width / arrayLength
const barHeightMultiplier = canvas.height / arrayLength

// Generate a random array
const array = Array.from({ length: arrayLength }, () =>
    Math.floor(Math.random() * canvas.height)
)

// Function to draw the array bars
function drawArray() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    for (let i = 0; i < array.length; i++) {
        const barHeight = array[i] * barHeightMultiplier

        ctx.fillStyle = "#FFF"
        ctx.fillRect(
            i * barWidth,
            canvas.height - barHeight,
            barWidth,
            barHeight
        )
    }
}

// Bubble Sort algorithm
function bubbleSort() {
    let sorted = false

    // Animation loop
    function animate() {
        if (sorted) {
            return
        }

        sorted = true

        for (let i = 0; i < array.length - 1; i++) {
            if (array[i] > array[i + 1]) {
                const temp = array[i]
                array[i] = array[i + 1]
                array[i + 1] = temp
                sorted = false
            }
        }

        // Draw the array bars
        drawArray()

        // Request the next animation frame
        requestAnimationFrame(animate)
    }

    // Start the animation
    animate()
}

// Start the Bubble Sort algorithm
bubbleSort()
