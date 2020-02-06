class player {

    constructor(name, active) {
        this.name = name;       // Name of the Player.
        this.active = active;   // Active state of the player, true or false value.
        this.score = 0;         // Score of the Player.
    }

    /**
     * Adds 'score' param value to Players score.
     * @param score
     */
    addToScore(score) {
        this.score += score;
    }

    /**
     * Resets Players score to zero.
     */
    resetScore() {
        this.score = 0;
    }

    /**
     * Sets the Players score and active status.
     *
     * @param active
     * @param score
     */
    resetPlayer(active, score) {
        this.active = active;
        this.score = score;
    }
}

module.exports = player;