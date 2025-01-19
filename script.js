'use strict';

let secretNumber = Math.trunc(Math.random()*20)+1;
let score = 20;
let highscore = document.querySelector('.highscore').textContent = localStorage.getItem('highscore');

const displayMessage = function (message) {
    document.querySelector('.message').textContent = message;
}

// select the .check class, add event listener click, select current guess and set it as a variable.
document.querySelector('.check').addEventListener('click', function() {
    const guess = Number(document.querySelector('.guess').value);

    // when the guess number is empty, it turns into a 0, which means false
    // when the guess number is the same as secret one, display the victory message
    // when the guess is lower or higher, remove one point from the player and update it
    if (!guess) {
        displayMessage('No number!');
    } else if (guess === secretNumber) {
        displayMessage('Correct Number!');
        document.querySelector('.number').textContent = secretNumber;
        document.querySelector('body').style.backgroundColor = '#60b347';
        document.querySelector('.number').style.width = '30rem';
        document.querySelector(".check").disabled = true;

        if(score > highscore) {
            highscore = score;
            localStorage.setItem('highscore', score);
            document.querySelector('.highscore').textContent = localStorage.getItem('highscore');
        }
    } else if (guess !== secretNumber) {
        if (score > 1) {
            score--;
            document.querySelector('.score').textContent = score;

            displayMessage(guess > secretNumber ? 'Too high!' : 'Too low!');
        } else {
            document.querySelector('.score').textContent = 0;
            displayMessage('You lost the game!');
        }
    }
});


document.querySelector('.again').addEventListener('click', function() {
    score = 20;
    document.querySelector('.score').textContent = score;
    secretNumber = Math.trunc(Math.random()*20)+1;
    document.querySelector('.number').textContent = '?';
    document.querySelector('.guess').value = '';
    document.querySelector('.message').textContent = 'Start guessing...';
    document.querySelector('body').style.backgroundColor = '#222';
    document.querySelector('.number').style.width = '15rem';
});