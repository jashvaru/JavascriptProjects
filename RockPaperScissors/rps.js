const computersChoiceDisp = document.getElementById("computers-choice");
const userChoiceDisp = document.getElementById("user-choice");
const resultDisp = document.getElementById("result");
const allChoices = document.querySelectorAll('button');
let userChoice;
let computerChoice;

allChoices.forEach((choices) => choices.addEventListener('click', (event) => {
    userChoice = event.target.id;
    userChoiceDisp.innerHTML = userChoice;
    generateCompChoice();
    resultCalc();
}));

function generateCompChoice() {
    let randomNum = Math.floor(Math.random() * 3) + 1;
    console.log(randomNum); 
    if (randomNum === 1) {
        computerChoice = "rock"
    } else if (randomNum === 2) {
        computerChoice = "paper"
    } else {
        computerChoice = "scissor"
    }

    computersChoiceDisp.innerHTML = computerChoice;
}

function resultCalc() {
    let result;
    if(userChoice === computerChoice) {
        result = "Its a draw";
    } 
    else if (userChoice === "rock" && computerChoice === "paper") {
        result = "You lose";
    } else if (userChoice === "rock" && computerChoice === "scissor") {
        result = "You win";
    } else if (userChoice === "paper" && computerChoice === "rock") {
        result = "You win";
    } else if (userChoice === "paper" && computerChoice === "scissor") {
        result = "You lose";
    } else if (userChoice === "scissor" && computerChoice === "rock") {
        result = "You lose";
    } else if (userChoice === "scissor" && computerChoice === "paper") {
        result = "You win";
    } 
    resultDisp.innerHTML = result;
}


