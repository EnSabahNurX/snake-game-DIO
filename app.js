let canvas = document.querySelector('#snake')
let context = canvas.getContext('2d')
let box = 16
let snake = []
snake[0] = {
    x: 8 * box,
    y: 8 * box
}
let direction = 'right'

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


function update(e) {
    if (e.keyCode == 37 && direction != 'right') direction = 'left'
    if (e.keyCode == 39 && direction != 'left') direction = 'right'
    if (e.keyCode == 38 && direction != 'down') direction = 'up'
    if (e.keyCode == 40 && direction != 'up') direction = 'down'
}

function startGame() {
    if (snake[0].x > (31 * box) && direction == 'right') snake[0].x = 0
    if (snake[0].x < 0 && direction == 'left') snake[0].x = 32 * box
    if (snake[0].y > (31 * box) && direction == 'down') snake[0].y = 0
    if (snake[0].y < 0 && direction == 'up') snake[0].y = 32 * box

    createBG()
    createSnake()

    let snakeX = snake[0].x
    let snakeY = snake[0].y


    if (direction == 'right') snakeX += box;
    if (direction == 'left') snakeX -= box
    if (direction == 'up') snakeY -= box
    if (direction == 'down') snakeY += box

    snake.pop()

    let newHead = {
        x: snakeX,
        y: snakeY
    }
    snake.unshift(newHead)
}

let game = setInterval(startGame, 100)
document.addEventListener('keydown', update)
