// Game value
let min = 1,
  max = 5,
  winningNum = getRandomNum(min, max),
  guessesLeft = 3;

// UI element
const gameWraper = document.querySelector('#game'),
  minNum = document.querySelector('.min-num'),
  maxNum = document.querySelector('.max-num'),
  guessBtn = document.querySelector('#guess-btn'),
  guessInput = document.querySelector('#guess-input'),
  message = document.querySelector('.message');

// Assign UI min and max
minNum.textContent = min;
maxNum.textContent = max;

// Play again event listener
gameWraper.addEventListener('mousedown', function (e) {
  if (e.target.className === 'play-again') {
    window.location.reload();
  }
});

// Listen to guess
guessBtn.addEventListener('click', function (e) {
  let guess = parseInt(guessInput.value);

  // Validate
  if (isNaN(guess) || guess < min || guess > max) {
    setMessage(`Please enter a number from ${min} to ${max}`, 'red');
  } else if (guess === winningNum) {
    // correct - won
    gameOver(true, `${winningNum} is correct, YOU WIN!`);
  } else if (guessesLeft > 1) {
    // incorrect - continue
    guessesLeft -= 1;

    guessInput.style.borderColor = 'red';
    guessInput.value = '';

    setMessage(
      `${guess} is not correct, please try again. ${guessesLeft} guesses left`,
      'red'
    );
  } else {
    gameOver(
      false,
      `Game over, you lost. The correct number was ${winningNum}`
    );
  }
});

// Set message
function setMessage(msg, color) {
  message.style.color = color;
  message.textContent = msg;
}

// Game over
function gameOver(won, msg) {
  let color;
  won === true ? (color = 'green') : (color = 'red');

  guessInput.disabled = true;
  guessInput.style.borderColor = color;
  message.style.color = color;
  setMessage(msg);

  // Play again?
  guessBtn.value = 'Play Again';
  guessBtn.className += 'play-again';
}

// Get winning number
function getRandomNum(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
