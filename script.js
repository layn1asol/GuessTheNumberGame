'use strict'; // a directive that turns on the strict mode in this script.
// doesn't let to use undeclared variables (let, const, var).
// turns 'bad syntax' that could be accepted into real errors.
// doesn't let you: delete functions, objects or variables.
// with statement is not allowed
// helps to write secure code
// in normal JavaScript, mistyping a variable name creates a new global variable.
// In strict mode, this will throw an error, making it impossible to accidentally create a global variable.


// set the secret number, random INT number between 1 and 20.
// we need to add 1, because trunc truncates the 19.9 number to 19.

// set the default score to 20
// get the highscore from localStorage
let secretNumber = Math.trunc(Math.random()*20)+1;
let score = 20;
let highscore = document.querySelector('.highscore').textContent = localStorage.getItem('highscore');

// function to display any message in the message html element
const displayMessage = function (message) {
    document.querySelector('.message').textContent = message;
}

// select the .check class, add event listener click, select current guess and set it as a variable.
document.querySelector('.check').addEventListener('click', function() {
    const guess = Number(document.querySelector('.guess').value);

    // when the guess number is empty, it turns into a 0, which means false. So it displays the 'no number' message
    // when the guess number is the same as secret one, display the victory message, change the background color,
    // width of the block, and disable the button
    // if score is higher than current highscore, update it and set as a new one. Save it in local storage.
    // when the guess is lower or higher, remove one point from the player and update it, display the new message
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

// when user presses again, all the values and elements get their initial state.
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