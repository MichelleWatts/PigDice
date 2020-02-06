class dice {

    constructor() {
        this.value = 0;                                                     // Value of the Dice.
        this.images = ["1.png","2.png","3.png","4.png","5.png","6.png"];    // Array of Dice images.
        this.imagesLocation = "./images/dice";                              // File location of Dice images.
    }

    /**
     * Returns a value between 1 and 6 for the dice roll.
     *
     * @returns {number}
     */
    setDiceRollValue() {
        this.value = Math.floor((Math.random()* 6) + 1);
    }

    /**
     * Returns string of image location.
     *
     * @param value
     * @returns {string}
     */
    getDiceImage(value) {
        return this.imagesLocation + this.images[value - 1]; // Start at 0 for array use.
    }
}

module.exports = dice;