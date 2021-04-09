// variables
let canvas = document.querySelector('#snake')
const time = document.querySelector('#time')
const score = document.querySelector('#score')
let context = canvas.getContext('2d')
let box = 16
let direction = 'right'
let snake = []
snake[0] = {
    x: 8 * box,
    y: 8 * box
}
let food = {
    x: Math.floor((Math.random() * 31) + 1) * box,
    y: Math.floor((Math.random() * 31) + 1) * box
}
let count = 0
let scoreCount = 0
let lastGrab = 0
let fruits = 0

// functions
function createBG() {
    context.fillStyle = 'lightgreen'
    context.fillRect(0, 0, 32 * box, 32 * box)
}

function createSnake() {
    for (let i = 0; i < snake.length; i++) {
        context.fillStyle = 'green'
        context.fillRect(snake[i].x, snake[i].y, box, box)
    }
}

function startGame() {
    score.innerHTML = scoreCount
    if (snake[0].x > (31 * box) && direction == 'right') snake[0].x = 0
    if (snake[0].x < 0 && direction == 'left') snake[0].x = 31 * box
    if (snake[0].y < 0 && direction == 'up') snake[0].y = 31 * box
    if (snake[0].y > (31 * box) && direction == 'down') snake[0].y = 0

    for (let i = 1; i < snake.length; i++) {
        if (snake[0].x == snake[i].x && snake[0].y == snake[i].y) {
            clearInterval(game)
            clearInterval(clock)
        }
    }

    for (let i = 1; i < snake.length; i++) {
        if (food.x == snake[i].x && food.y == snake[i].y) {
            drawFood
        }
    }

    createBG()
    createSnake()
    drawFood()

    let snakeX = snake[0].x
    let snakeY = snake[0].y


    if (direction == 'right') snakeX += box;
    if (direction == 'left') snakeX -= box
    if (direction == 'up') snakeY -= box
    if (direction == 'down') snakeY += box

    if (snakeX != food.x || snakeY != food.y) {
        snake.pop()
    } else {
        food.x = Math.floor((Math.random() * 31) + 1) * box
        food.y = Math.floor((Math.random() * 31) + 1) * box
        fruits++
        scoreCount += Math.floor(100 / (count - lastGrab) + 1.3 ** fruits)
    }

    let newHead = {
        x: snakeX,
        y: snakeY
    }
    snake.unshift(newHead)
}

function update(e) {
    if (e.keyCode == 37 && direction != 'right') direction = 'left'
    if (e.keyCode == 39 && direction != 'left') direction = 'right'
    if (e.keyCode == 38 && direction != 'down') direction = 'up'
    if (e.keyCode == 40 && direction != 'up') direction = 'down'
}

function drawFood() {
    context.fillStyle = 'red'
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 3; j++) {
            context.beginPath();
            let radius = 8; // Arc radius
            let startAngle = 0; // Starting point on circle
            let endAngle = Math.PI + (Math.PI * j) / 2; // End point on circle
            let counterclockwise = i % 2 !== 0; // clockwise or counterclockwise
            context.arc(food.x + 8, food.y + 8, radius, startAngle, endAngle, counterclockwise);
            context.fill();
        }
    }
}

function incremmentCloc() {
    time.innerHTML = count
    count++
}

// events
let game = setInterval(startGame, 90)
document.addEventListener('keydown', update)
let clock = setInterval(incremmentCloc, 1000)