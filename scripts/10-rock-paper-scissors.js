let score = JSON.parse(localStorage.getItem('score')) || {
  wins: 0,
  losses: 0,
  ties: 0
};

updateScoreElement();

function clearResultClass() {
  let scoreText = document.querySelector('.js-result');
  scoreText.classList.remove('result-tie');
  scoreText.classList.remove('result-win');
  scoreText.classList.remove('result-loss');
}

function playGame(playerMove) {
  const computerMove = pickComputerMove();
  let scoreText = document.querySelector('.js-result');
  let result = '';

  clearResultClass();

  if (playerMove === 'rock') {
    if (computerMove === 'rock') {
      result = 'Tie.';
    } else if (computerMove === 'paper') {
      result = 'You lose.';
    } else {
      result = 'You win.';
    } 
    
  } else if (playerMove === 'paper') {
      if (computerMove === 'paper') {
        result = 'Tie.';
      } else if (computerMove === 'scissors') {
        result = 'You lose.';
      } else {
        result = 'You win.';
      }

  } else if (playerMove === 'scissors') {
      if (computerMove === 'scissors') {
        result = 'Tie.';
      } else if (computerMove === 'rock') {
        result = 'You lose.';
      } else {
        result = 'You win.';
      }
    }

  if (result === 'You win.') {
    score.wins++;
    scoreText.classList.add('result-win');
  } else if (result === 'You lose.') {
    score.losses++;
    scoreText.classList.add('result-loss');
  } else {
    score.ties++;
    scoreText.classList.add('result-tie');
  }

  console.log(scoreText);

  localStorage.setItem('score', JSON.stringify(score));

  updateScoreElement();

  scoreText.innerHTML = result;
    
  document.querySelector('.js-moves')
    .innerHTML = `You played
    <img src="images/${playerMove}-emoji.png" class="move-icon">
    <p>and Computer played<img src="images/${computerMove}-emoji.png" class="move-icon">
    `;

}

function updateScoreElement() {
  document.querySelector('.js-score')
    .innerHTML = `<b>Current score of games:</b><p>Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}</p>`;
}

function pickComputerMove() {
  const randomNumber = Math.random();

  let computerMove = '';

  if (randomNumber >=0 && randomNumber < 1 / 3) {
    computerMove = 'rock';
  } else if (randomNumber >= 1 / 3 && randomNumber < 2 / 3) {
    computerMove = 'paper';
  } else {
    computerMove = 'scissors';
  }

  return computerMove;
}

function clearResultText() {
  clearResultClass();

  document.querySelector('.js-moves')
    .innerHTML = ` `;
  
  document.querySelector('.js-result')
    .innerHTML = `Your score is reset. Play again!`;
}

function resetScore() {
  score.wins = 0;
  score.losses = 0;
  score.ties = 0;
  localStorage.removeItem('score');

  clearResultText();

  updateScoreElement();
}    
