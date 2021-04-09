// variables
let canvas = document.querySelector('#snake')
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


// functions
function createBG() {
    context.fillStyle = 'lightgreen'
    context.fillRect(0, 0, 32 * box, 32 * box)
}

function createSnake() {
    for (i = 0; i < snake.length; i++) {
        context.fillStyle = 'green'
        context.fillRect(snake[i].x, snake[i].y, box, box)
    }
}

function startGame() {
    if (snake[0].x > (31 * box) && direction == 'right') snake[0].x = 0
    if (snake[0].x < 0 && direction == 'left') snake[0].x = 32 * box
    if (snake[0].y > (31 * box) && direction == 'down') snake[0].y = 0
    if (snake[0].y < 0 && direction == 'up') snake[0].y = 32 * box

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
    context.fillRect(food.x, food.y, box, box)
}

// events
let game = setInterval(startGame, 100)
document.addEventListener('keydown', update)


// to do
// chock food and snake when random appear