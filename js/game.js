class game {

    constructor(numberOfPlayers, winningScore) {
        this.numberOfPlayers = numberOfPlayers;     // Number of Players.
        this.active = true;                         // State of the Game, can be true or false. True, when playing. False for won or lost.
        this.currentDiceScore = 0;                  // Value of the rolled Dice.
        this.winningScore = winningScore;           // Value of score to win the Game.
    }

    setupGame() {
        this.currentDiceScore = 0;
        this.active = true;
    }

    setGameInactive() {
        this.active = false;
    }

    resetScore() {
        this.currentDiceScore = 0;
    }
}

module.exports = game;