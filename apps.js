// Acess DOM Elements
const displayBox = document.querySelector('#guessBox');
const guesses = document.getElementsByClassName('guesses');
const gameMessage = document.getElementById('message');
const newGameBtn = document.querySelector('#again');
const score = document.getElementById('score');
const body = document.querySelector('body')
const highScoreDisplay = document.getElementById('highScore');

// Start working on the Game

// Generate a random color
const colors = ['#EFBC9B', '#9D6A89', '#A8B4A5', '#395C6B', '#80A4ED', '#3C91E6']
let randomColor = colors[Math.floor(Math.random() * 6)]

// Add event listeners
let scoreValue = 5;
let highScore = localStorage.getItem('highScore') || 0;
highScoreDisplay.textContent = highScore;

let gameActive = true;

Array.from(guesses).forEach(guessBox => {
    guessBox.addEventListener('click', function(event) {
        if (!gameActive) return;

        if (event.target.id === randomColor) {
            gameMessage.textContent = "You're correct 👍🏽. Guess Master 🍾";
            body.classList.add('victory');
            displayBox.style.backgroundColor = randomColor;
            displayBox.textContent = "👍🏿";

            
            if (scoreValue > highScore) {
                highScore = scoreValue;
                localStorage.setItem('highScore', highScore);
                highScoreDisplay.textContent = highScore;
            }

            gameActive = false; 

        } else {
            gameMessage.textContent = "Wrong Guess 😔. Keep guessing 💪🏽";

            if (scoreValue > 0) --scoreValue;
            score.textContent = scoreValue;

            if (scoreValue === 0) {
                setTimeout(() => {
                    alert('OOPS!!😬😬 You have exhausted your chances. Try again later 💪🏽');
                    resetValues();
                }, 100);
            }
        }
    });
});

newGameBtn.addEventListener('click', resetValues);

function resetValues() {
    scoreValue = 5;
    score.textContent = scoreValue;
    gameMessage.textContent = 'Start Guessing ...';
    body.classList.remove('victory');
    randomColor = colors[Math.floor(Math.random() * 6)]; // Generate a new random color
    displayBox.style.backgroundColor = 'transparent';
    displayBox.textContent = '?';
    gameActive = true; 
}
