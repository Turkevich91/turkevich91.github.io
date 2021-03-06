'use strict';

// Selecting elements
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');

const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');

const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');

const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

let scores, currentScore, activePlayer, playing;

// initializing
score0El.textContent = 0;
score1El.textContent = 0;
activePlayer = 0;
currentScore = 0;

//functions
const switchPlayer = function (hold = false) {
    const reinit = function () {
        console.log(`change player`)
        currentScore = 0;
        document.getElementById(`current--0`).textContent = 0;
        document.getElementById(`current--1`).textContent = 0;
        console.log(`current user is: ${activePlayer + 1}`)
        document.querySelector('.player--0').classList.toggle('player--active');
        document.querySelector('.player--1').classList.toggle('player--active');
        //FIXME: refactor
        activePlayer = activePlayer == 0 ? 1 : 0
    };

    if (hold) {
        console.log(`save value to players score`)

        let currentScoreElement = (activePlayer == 0 ? score0El : score1El)
        currentScoreElement.textContent = Number(currentScoreElement.textContent) + currentScore;

        // Win?
        if (currentScoreElement.textContent >= 100) {
            console.log(`Player # ${activePlayer + 1} Won!`);
            btnRoll.classList.add('hidden')
            btnHold.classList.add('hidden')
            document.querySelector(`.player--${activePlayer}`).classList.add('player--winner')
            console.log(document.querySelector(`.player--${activePlayer}`))
        }

        reinit();
    } else {
        reinit()
    }
}

const rollDice = function () {
    let dice = Math.trunc(Math.random() * 6) + 1;
    // check if dice value == 1
    if (dice == 1) {
        diceEl.classList.remove('hidden');
        diceEl.src = `dice-${dice}.png`;
        console.log(dice);
        switchPlayer();
    } else {
        diceEl.classList.remove('hidden');
        diceEl.src = `dice-${dice}.png`;
        console.log(dice);
        currentScore += dice;
        console.log(currentScore)
        document.querySelector(`#current--${activePlayer}`).textContent = currentScore;
    }
};

//Events
btnNew.addEventListener('click', newGame)
btnRoll.addEventListener('click', rollDice);
btnHold.addEventListener('click', addScore)

function newGame() {
    console.log(`starting new game`)
    btnRoll.classList.remove('hidden')
    btnHold.classList.remove('hidden')
    score0El.textContent = 0;
    score1El.textContent = 0;
    activePlayer = 0;
    document.querySelector('.player--0').classList.add('player--active')
    document.querySelector('.player--1').classList.remove('player--active')
    document.getElementById('current--0').textContent = 0;
    document.getElementById('current--1').textContent = 0;
    // document.querySelector()
    // whether or not winner class exist
    if(document.querySelector('.player--winner')) {
        document.querySelector('.player--winner').classList.remove('player--winner')
    }
}

function addScore() {
    if (currentScore == 0) {
        console.log(`Roll the Dice first!`);
    } else {
        switchPlayer(true);
    }
}