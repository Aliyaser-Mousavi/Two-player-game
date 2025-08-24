'use strict';

const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.getElementById('score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const winnerMsg = document.querySelector('.winner-message');

const soundRoll = new Audio('/click.mp3');
const soundHold = new Audio('/hold.mp3');
const soundWin = new Audio('/win.mp3');
const soundLose = new Audio('/lose.mp3');

let playing, currentScore, activePlayer, scores;
const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  currentScore = 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};
const init = function () {
  playing = true;
  currentScore = 0;
  activePlayer = 0;
  scores = [0, 0];

  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  diceEl.classList.add('hidden');
  winnerMsg.classList.add('hidden');
  winnerMsg.textContent = '';

  player0El.className = 'player player--0 player--active';
  player1El.className = 'player player--1';
};
init();

btnRoll.addEventListener('click', function () {
  if (playing) {
    soundRoll.play();
    const dice = Math.trunc(Math.random() * 6) + 1;
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;
    diceEl.classList.add('roll');
    setTimeout(() => diceEl.classList.remove('roll'), 500);
    if (dice !== 1) {
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      switchPlayer();
    }
  }
});
btnHold.addEventListener('click', function () {
  if (playing) {
    soundHold.play();

    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    if (scores[activePlayer] >= 50) {
      playing = false;
      diceEl.classList.add('hidden');

      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');

      const loser = activePlayer === 0 ? 1 : 0;
      document
        .querySelector(`.player--${loser}`)
        .classList.add('player--loser');
      winnerMsg.textContent = `🎉 Player ${activePlayer + 1} Wins! 🎉`;
      winnerMsg.classList.remove('hidden');
      soundWin.play();
      setTimeout(() => soundLose.play(), 300);
    } else {
      switchPlayer();
    }
  }
});
btnNew.addEventListener('click', init);
