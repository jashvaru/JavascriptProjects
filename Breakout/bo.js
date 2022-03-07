const grid = document.querySelector('.grid');
const blockWidth = 100;
const blockHeight = 20;
const boardWidth = 560;
const boardHeight = 300;

startPosition = [230, 10];
currentPosition = startPosition;

ballStartPosition = [270, 40];
ballCurrentPosition = ballStartPosition;

/* Creating a block with its all 4 points known */
class Block {
    constructor(xAxis, yAxis) {
        this.bottomLeft = [xAxis, yAxis];
        this.bottomRight = [xAxis + blockWidth, yAxis];
        this.topLeft = [xAxis, yAxis + blockHeight];
        this.topRight = [xAxis + blockWidth, yAxis + blockHeight];
    }
}

/* Array of all my blocks */
const blocks = [
    new Block(10, 270),
    new Block(120, 270),
    new Block(230, 270),
    new Block(340, 270),
    new Block(450, 270),
    new Block(10, 240),
    new Block(120, 240),
    new Block(230, 240),
    new Block(340, 240),
    new Block(450, 240),
    new Block(10, 210),
    new Block(120, 210),
    new Block(230, 210),
    new Block(340, 210),
    new Block(450, 210)
];

function addBlocks() {
    for (let i = 0; i < blocks.length; i++) {
        const block = document.createElement('div');
        block.classList.add('block');
        block.style.left = blocks[i].bottomLeft[0] + 'px';
        block.style.bottom = blocks[i].bottomLeft[1] + 'px';
        grid.appendChild(block);
    }
}
addBlocks();

/* Making a user block */
const user = document.createElement('div');
user.classList.add('user');
grid.appendChild(user);
drawUser();

function drawUser() {
    user.style.left = currentPosition[0] + 'px';
    user.style.bottom = currentPosition[1] + 'px';
}

function moveUser(e) {
    switch(e.key) {
        case "ArrowLeft": {
            if(currentPosition[0] > 0)
            {
                currentPosition[0] -= 10;
                drawUser();
            }
            break;
        }
            
        case "ArrowRight": {
            if(currentPosition[0] < boardWidth - blockWidth)
            {
                currentPosition[0] += 10;
                drawUser();
            }
            break;
        }
    }
}

document.addEventListener('keydown', moveUser);

// /* Making of balls */
// const ball = document.createElement('div');
// ball.classList.add('ball');
// grid.appendChild(ball);
// drawBall();

// function drawBall() {
//     ball.style.left = ballCurrentPosition[0] + 'px';
//     ball.style.bottom = ballCurrentPosition[1] + 'px';
// }

// /* move ball */
// function moveBall() {
//     currentPosition[0] += 2;
//     currentPosition[1] += 2;
//     drawBall();
// }

// setInterval(moveBall, 30);