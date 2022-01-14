class Snake {
    constructor(x, y, size) {
        this.x = x
        this.y = y
        this.size = size
        this.tail = [{x:this.x, y:this.y}]
        this.dX = 0
        this.dY = 1
    }

    move() {
        var newX = this.tail[this.tail.length - 1].x + this.dX * this.size
        var newY = this.tail[this.tail.length - 1].y + this.dY * this.size

        this.tail.shift()
        this.tail.push({x:newX, y:newY})
    }
}

class Apple {
    constructor() {
        this.color = "red"
        this.size = snake.size

        var isTouching = false;
        while(!isTouching) { // find a random location that the snake doesn't already touch
            this.x = Math.floor(Math.random() * canvas.width / snake.size) * snake.size
            this.y = Math.floor(Math.random() * canvas.height / snake.size) * snake.size

            for(var i  = 0; i < snake.tail.length; i++){
                if(this.x == snake.tail[i].x && this.y == snake.tail[i].y) {
                    isTouching = true
                }
            }

            if(!isTouching) {
                break
            }
        }
    }
}



var canvas = document.getElementById("canvas")

var snake = new Snake(20, 20, 20);

var apple = new Apple();

var canvasContext = canvas.getContext('2d')

window.onload = () => {
    gameLoop();
}

function gameLoop() {
    setInterval(show, 1000/15) // 15 is the fps for the game
}

function show() {
    update();
    draw();
}

function update() {
    canvasContext.clearRect(0, 0, canvas.width, canvas.height)
    snake.move()
    eatApple()
}

function eatApple() {
    if(snake.tail[snake.tail.length-1].x == apple.x && snake.tail[snake.tail.length-1].y == apple.y){
        snake.tail.push({x:apple.x, y:apple.y})
        apple = new Apple()
    }
}

function draw() {
    createRect(0,0,canvas.width,canvas.height,"black")

    for(var i = 0; i < snake.tail.length; i++) {
        createRect(snake.tail[i].x + 2.5, snake.tail[i].y + 2.5, snake.size - 5, snake.size - 5, "white")
    }

    canvasContext.font = "20px Arial"
    canvasContext.fillStyle = "#00FF42"
    canvasContext.fillText("Score: " + (snake.tail.length - 1), canvas.width - 120, 18)
    createRect(apple.x, apple.y, apple.size, apple.size)
}

function createRect(x, y, width, height, color) {
    canvasContext.fillStyle = color
    canvasContext.fillRect(x, y, width, height)
}


window.addEventListener("keydown",function(event) {
    if (event.defaultPrevented) {
        return; // Do nothing if event already handled
    }

    switch(event.code) {
        case "ArrowUp":
        case "KeyW":
            snake.dX = 0
            snake.dY = -1
            break;
        case "ArrowDown":
        case "KeyS":
            snake.dX = 0
            snake.dY = 1
            break;
        case "ArrowLeft":
        case "KeyA":
            snake.dX = -1
            snake.dY = 0
            break;
        case "ArrowRight":
        case "KeyD":
            snake.dX = 1
            snake.dY = 0
            break;
        case "Space":
            snake.dX = 0
            snake.dY = 0
            console.log("Paused!")
            break;
    }
    
    // Consume the event so it doesn't get handled twice
    event.preventDefault();
}, true)
