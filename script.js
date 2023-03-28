// store main game data/game state
let gameData = {
  boardSize: 7,
  numShips: 3,
  shipLength: 3,
  shipsSunk: 0,

  // array thats storing the ship locations and if the player has hit those ship locations
  ships: [
    { locations: [0, 0, 0], hits: ["", "", ""] }, // 0
    { locations: [0, 0, 0], hits: ["", "", ""] }, // 1
    { locations: [0, 0, 0], hits: ["", "", ""] }, // 2
  ],

  // function that passes users guess and checks for hit/miss/sunk
  fire: function (guess) {
    for (let i = 0; i < this.numShips; i++) {
      // numShips is 3 as of now
      // 'this' refers to gameData here
      let ship = this.ships[i]; // aka gameData.ships[0,1,2]
      let index = ship.locations.indexOf(guess); // assigns users guess to index if its found

      if (ship.hits[index] === "hit") {
        // checks matching index in hits array for "hit"
        resultsDisplay.displayMessage(
          "Oops, you already hit that location silly goose!"
        );
        return true;
      } else if (index >= 0) {
        // if -1 its a miss and we exit here
        ship.hits[index] = "hit"; // sets index to "hit" since we hit
        resultsDisplay.displayHit(guess);
        resultsDisplay.displayMessage("HIT!");

        if (this.isSunk(ship)) {
          resultsDisplay.displayMessage("You sank my battleship silly goose!");
          this.shipsSunk++; // updates win condition
        }
        return true;
      }
    }
    // if all tests fail user has missed
    resultsDisplay.displayMiss(guess);
    resultsDisplay.displayMessage("You missed, you silly goose.");
    return false;
  },

  // TODO: FUNCTION 'isSunk' TO CHECK IF SHIP HAS BEEN SUNK
};

// display results of guess to the player (msg and miss/hit)
let resultsDisplay = {
  // will display msg based on the msg passed to the function based on the users guess results
  displayMessage: function (msg) {
    let messageArea = document.getElementById("messageArea");
    messageArea.innerHTML = msg;
  },

  // will take users guess and update the cell that was guessed with 'hit' img
  displayHit: function (location) {
    let cell = document.getElementById(location);
    cell.setAttribute("class", "hit");
  },

  // will take users guess and update the cell that was guessed with 'miss' img
  displayMiss: function (location) {
    let cell = document.getElementById(location);
    cell.setAttribute("class", "miss");
  },
};

//track amount of guesses and win condition

// function to parse a guess from the user

// event handlers
// handle fire button
// handle key press

// initialize the game/assign event handlers and generate ship locations
