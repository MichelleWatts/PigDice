const Player = require('./player.js');
const Dice = require('./dice.js');
const Game = require('./game.js');

// Instantiate Player objects.
const PlayerOne = new Player('PlayerOne', true);
const PlayerTwo = new Player('PlayerTwo', false);

// Instantiate Dice objects.
const DiceOne = new Dice();
const DiceTwo = new Dice();

//Instantiate Game object.
let gamePlay = new Game(2, 100);

/**
 * Create Game object with 2 players and a winning score of 20.
 */
function startNewGame() {
    gamePlay = new Game(2, 100);
    gamePlay.setupGame();
}

/**
 * If PlayerOne is inactive return player one else return player two.
 *
 * @returns {player}
 */
function getInactivePlayer() {
    return PlayerOne.active === false ? PlayerOne : PlayerTwo;
}

/**
 * If PlayerOne is active return player one else return player two.
 *
 * @returns {player}
 */
function getActivePlayer() {
    return PlayerOne.active === true ? PlayerOne : PlayerTwo;
}

/**
 *  Disable dice roll and hold buttons.
 */
function disableGameBoard() {
    document.querySelector('.btn-roll-dice').setAttribute('disabled','disabled');
    document.querySelector('.btn-hold-game').setAttribute('disabled','disabled');
}

/**
 *  Enable dice roll and hold buttons.
 */
function enableGameBoard() {
    document.querySelector('.btn-roll-dice').removeAttribute('disabled');
    document.querySelector('.btn-hold-game').removeAttribute('disabled');
}

/**
 *  Set Players displayed current value to 0 and switch active classes.
 */
function switchGameBoard() {
    document.getElementById(getActivePlayer().name+ 'Current').textContent = 0;
    document.getElementById(getInactivePlayer().name+ 'Current').textContent = 0;

    document.getElementById(getActivePlayer().name+ 'Wrapper').classList.add('active');
    document.getElementById(getInactivePlayer().name+ 'Wrapper').classList.remove('active');
}

/**
 *
 * @param timeout
 */
function switchPlayers(timeout) {

    // Reset the Games current dice score.
    gamePlay.currentDiceScore = 0;

    // Select all Dice elements that have rolled a value of 1.
    let diceOneElements = document.querySelectorAll("[src='./images/dice1.png']");

    // When Dice value is 1, prevent clicking on the "Roll dice" button during animation and add 'shake' class for animation.
    if(diceOneElements.length > 0){
        for (let i = 0; i < diceOneElements.length; i++ ) {
            disableGameBoard();
            diceOneElements[i].classList.add('shake');
        }
    }

    // Select all Dice elements - DOM elements with 'dice' class.
    let dice = document.querySelectorAll('.dice');

    // Hide Dice elements whilst switching players, remove 'shake' animation class and enable "Roll dice" button.
    setTimeout(function(){
        for (let j = 0; j < dice.length; j++ ) {
            dice[j].classList.add('hidden');
            if(diceOneElements[j]){
                diceOneElements[j].classList.remove('shake');
            }
        }
        enableGameBoard();
    }, timeout);

    // Make inactive player active, and active player inactive.
    if(PlayerOne.active === true) {
        PlayerOne.active = false;
        PlayerTwo.active = true;
    } else {
        PlayerOne.active = true;
        PlayerTwo.active = false;
    }

    switchGameBoard();
}

/**
 * On "Roll Dice" event:
 *
 * Create Game object to "start game".
 * Handles Dice roll and display.
 */
document.querySelector('.btn-roll-dice').addEventListener('click', function () {

    if(gamePlay.active === true) {

        // Get first Dice value, show the DOM element and set image.
        DiceOne.setDiceRollValue();
        let diceDOM = document.querySelector('.dice');
        diceDOM.classList.remove('hidden');
        diceDOM.src = DiceOne.getDiceImage(DiceOne.value);

        // Get second Dice value, show the DOM element and set image.
        DiceTwo.setDiceRollValue();
        let diceDOM2 = document.querySelector('.dice-2');
        diceDOM2.classList.remove('hidden');
        diceDOM2.src = DiceTwo.getDiceImage(DiceTwo.value);

        // Set the total Dice score.
        gamePlay.currentDiceScore = DiceOne.value + DiceTwo.value;

        // If both values of each Dice do not equal 1, then display the Dice values.
        if (DiceOne.value !== 1 && DiceTwo.value !== 1) {
            document.getElementById(getActivePlayer().name + 'Current').textContent = gamePlay.currentDiceScore;

        // If both values of Dice equal 1, "Snake Eyes", then reset Player's points to 0 and switch Players.
        } else if (DiceOne.value === 1 && DiceTwo.value === 1) {
            // Reset Game and player score.
            getActivePlayer().resetScore();
            document.getElementById(getActivePlayer().name+ 'Score').textContent = getActivePlayer().score;
            switchPlayers(1000);

        //  Else one Dice value equals 1, so switch Players.
        } else {
            switchPlayers(1000);
        }
    }
});

/**
 * On "Hold Game" event:
 *
 * Check if Player has won. i.e. Player score matches or exceeds 100.
 */
document.querySelector('.btn-hold-game').addEventListener('click', function () {

    // Add current Dice value to Players score and display it.
    getActivePlayer().addToScore(gamePlay.currentDiceScore);
    document.getElementById(getActivePlayer().name+ 'Score').textContent = getActivePlayer().score;

    // Check if Player has won the game. Display winning message and set game to inactive. Else, continue game play.
    if(getActivePlayer().score >= gamePlay.winningScore) {
        document.getElementById(getActivePlayer().name + 'Name').textContent = 'Winner!';
        gamePlay.active = false;
        disableGameBoard();
    } else {
        switchPlayers(100);
    }
});

/**
 * On "New Game" event:
 *
 * Start new Game - create Game object.
 */
document.querySelector('.btn-new-game').addEventListener('click', function () {

    startNewGame();

    // Reset Game board for new game.
    let PlayerName = document.getElementById(getActivePlayer().name + 'Name');
    PlayerName.textContent = PlayerName.getAttribute('data-name');
    document.getElementById(getActivePlayer().name+ 'Score').textContent = 0;
    document.getElementById(getInactivePlayer().name+ 'Score').textContent = 0;

    // Select all Dice elements - DOM elements with 'dice' class.
    let dice = document.querySelectorAll('.dice');
    // Hide Dice elements whilst switching players, remove 'shake' animation class and enable "Roll dice" button.
    for (let j = 0; j < dice.length; j++ ) {
        dice[j].classList.add('hidden');
    }

    PlayerOne.resetPlayer(true, 0);
    PlayerTwo.resetPlayer(false, 0);

    switchGameBoard();

    enableGameBoard();
});