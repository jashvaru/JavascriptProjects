const grid = document.querySelector('.grid');
const scoreDisp = document.querySelector('#score');
const blockWidth = 100;
const blockHeight = 20;
const boardWidth = 560;
const boardHeight = 300;
const ballDia = 20;

let timerId;
let xDir = 2;
let yDir = 2;
let score = 0;

startPosition = [230, 10];
currentPosition = startPosition;

ballStartPosition = [270, 40];
ballCurPos = ballStartPosition;

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
    console.log('creating block');
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
    switch (e.key) {
        case "ArrowLeft": {
            if (currentPosition[0] > 0) {
                currentPosition[0] -= 10;
                drawUser();
            }
            break;
        }

        case "ArrowRight": {
            if (currentPosition[0] < boardWidth - blockWidth) {
                currentPosition[0] += 10;
                drawUser();
            }
            break;
        }
    }
}

document.addEventListener('keydown', moveUser);

/* Making of balls */
const ball = document.createElement('div');
ball.classList.add('ball');
grid.appendChild(ball);
drawBall();

function drawBall() {
    ball.style.left = ballCurPos[0] + 'px';
    ball.style.bottom = ballCurPos[1] + 'px';
}

/* move ball */
function moveBall() {
    ballCurPos[0] += xDir;
    ballCurPos[1] += yDir;
    drawBall();
    checkCollision();
}

timerId = setInterval(moveBall, 30);

/* Check for collision */
function checkCollision() {

    //check for block collision
    for (let i = 0; i < blocks.length; i++) {
        if (
            (ballCurPos[0] > blocks[i].bottomLeft[0] && ballCurPos[0] < blocks[i].bottomRight[0]) &&
            ((ballCurPos[1] + ballDia) > blocks[i].bottomLeft[1] && ballCurPos[1] < blocks[i].bottomRight[1])
        ) {
            const allBlocks = Array.from(document.querySelectorAll('.block'));
            allBlocks[i].classList.remove('block');
            blocks.splice(i, 1);
            changeDir();
            score++;
            scoreDisp.innerHTML = score;

            //check for win
            if (blocks.length === 0) {
                scoreDisp.innerHTML = 'YOU WIN'
                clearInterval(timerId)
                document.removeEventListener('keydown', moveUser);
            }
        }
    }

    //check collision for the user block
    if (
        (ballCurPos[0] > currentPosition[0] && ballCurPos[0] < (currentPosition[0] + blockWidth)) &&
        (ballCurPos[1] > currentPosition[1] && ballCurPos[1] < (currentPosition[1] + blockHeight))
    ) {
        changeDir();
    }

    //check collision for top left and right of the grid
    if (ballCurPos[0] >= (boardWidth - ballDia) ||
        ballCurPos[1] >= (boardHeight - ballDia) ||
        ballCurPos[0] <= 0) {
        changeDir();
    }

    //check collision for bottom of the grid
    if (ballCurPos[1] <= 0) {
        clearInterval(timerId);
        scoreDisp.innerHTML = "You lose";
        removeEventListener('keydown', moveUser);
    }
}

function changeDir() {
    if (xDir === 2 && yDir === 2) {
        yDir = -2;
        return;
    }
    if (xDir === 2 && yDir === -2) {
        xDir = -2;
        return;
    }
    if (xDir === -2 && yDir === -2) {
        yDir = 2;
        return;
    }
    if (xDir === -2 && yDir === 2) {
        xDir = 2;
        return;
    }


}

