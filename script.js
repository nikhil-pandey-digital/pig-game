'use strict';

//selecting elements

const score0Ele = document.getElementById('score--0');

const score1Ele = document.getElementById('score--1');

const current0Ele = document.getElementById('current--0');

const current1Ele = document.getElementById('current--1');

const diceEle = document.querySelector('.dice');

const btnNewEle = document.querySelector('.btn--new');
const btnRollEle = document.querySelector('.btn--roll');
const btnHoldEle = document.querySelector('.btn--hold');

const player0Ele = document.querySelector('.player--0');
const player1Ele = document.querySelector('.player--1');

let score, current, activeplayer, gameOver

const init = function () {

    score = [0, 0];
    current = 0;

    //player status
    activeplayer = 0;

    //game status
    gameOver = false;

    score0Ele.textContent = 0;
    score1Ele.textContent = 0;

    current0Ele.textContent = 0;
    current1Ele.textContent = 0;


    diceEle.classList.add('hidden');
    document.querySelector(`.player--0`).classList.remove('player--winner');
    document.querySelector(`.player--1`).classList.remove('player--winner');

    document.querySelector(`.player--1`).classList.remove('player--active');
    document.querySelector(`.player--0`).classList.add('player--active');
}
init();


//switch player
const switchPlayer = function () {
    current = 0;
    document.getElementById(`current--${activeplayer}`).textContent = current;

    player0Ele.classList.toggle('player--active');
    player1Ele.classList.toggle('player--active');

    activeplayer = activeplayer === 0 ? 1 : 0;
}

//roll dice functionality

btnRollEle.addEventListener('click', function () {

    if (!gameOver) {
        //1 generate random number
        let dice = Math.floor(Math.random() * 6) + 1;
        // 2 show the  dice
        if (diceEle.classList.contains('hidden')) diceEle.classList.remove('hidden');

        diceEle.src = `dice-${dice}.png`;

        // 3  if dice===1 then  current score=0  and switch to other player
        if (dice === 1) {
            switchPlayer();
        } else {
            current += dice;
            document.getElementById(`current--${activeplayer}`).textContent = current;
        }

    }
});

//hold button functionality

btnHoldEle.addEventListener('click', function () {

    if (!gameOver) {
        //modify the score of current player
        score[activeplayer] += current;

        document.getElementById(`score--${activeplayer}`).textContent = score[activeplayer];

        //check if player wins
        if (score[activeplayer] >= 100) {
            gameOver = true;
            diceEle.classList.add('hidden');
            document.querySelector(`.player--${activeplayer}`).classList.add('player--winner');
            document.querySelector(`.player--${activeplayer}`).classList.remove('player--active');

        }
        else {
            //switch player
            switchPlayer();
        }
    }
});

// reset functionality

btnNewEle.addEventListener("click", function () {
    init();
});