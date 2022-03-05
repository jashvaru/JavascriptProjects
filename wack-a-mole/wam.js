/* Collecting node objs */
const scoreDisp = document.querySelector('#score');
const timeDisp = document.querySelector('#time-left');
const squares = document.querySelectorAll('.square');

let score = 0;
let eventBool = false;
let randomSquare;
let timeLeft = 30; //time limit

function makeMole() {
    /* if time is up clear all things and show final results */
    if(timeLeft === 0)
    {
        randomSquare.classList.remove('mole');
        randomSquare.removeEventListener('click', scoreCounter);
        clearInterval(dispRandomSquare);
        alert("time up your score is " + score)
        return;
    }

    /* This part of code will execute in the second call*/
    if(eventBool === true) {
        randomSquare.classList.remove('mole');
        randomSquare.removeEventListener('click', scoreCounter);  
    }
    
    /* creating a random mole by giving it mole and click property */
    randomSquare = squares[Math.floor(Math.random() * 9)];
    randomSquare.classList.add('mole');
    randomSquare.addEventListener('click', scoreCounter);
    eventBool = true;

    timeDisp.innerHTML = timeLeft;
    timeLeft--;

}

function scoreCounter() {
    score++;
    scoreDisp.innerHTML = score;
}


let dispRandomSquare = setInterval(makeMole, 1000);

/* restart the game on button press */
reload.addEventListener('click', () => window.location.reload());


