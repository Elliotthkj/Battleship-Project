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
      let index = ship.locations.indexOf(guess); // assigns users guess to index if its found, -1 if not found

      if (ship.hits[index] === "hit") {
        // checks matching index in hits array for "hit"
        resultsDisplay.displayMessage(
          "Oops, you already hit that location silly goose!"
        );
        return true;
      } else if (index >= 0) {
        // if -1 its a miss and we exit here
        ship.hits[index] = "hit"; // sets index location to "hit" since we hit
        resultsDisplay.displayHit(guess);
        resultsDisplay.displayMessage("HIT!");

        if (this.isSunk(ship)) {
          resultsDisplay.displayMessage("You sank my battleship silly goose!");
          this.shipsSunk++; // updates win condition, 3 to win
        }
        return true;
      }
    }
    // if all tests fail user has missed
    resultsDisplay.displayMiss(guess);
    resultsDisplay.displayMessage("You missed, you silly goose.");
    return false;
  },

  // runs through the ship's array when called in fire(guess) after a hit is made and checks if all indexes are marked "hit"
  isSunk: function (ship) {
    for (let i = 0; i < this.shipLength; i++) {
      if (ship.hits[i] !== "hit") {
        return false; // false ship is NOT sunk yet
      }
    }
    return true; // true if all indexes are marked "hit"
  },

  // TODO: generate ship locations
};

// display results of guess to the player (msg and miss/hit)
let resultsDisplay = {
  // displays msg based on the msg passed to the function based on the users guess results
  displayMessage: function (msg) {
    let messageArea = document.getElementById("messageArea");
    messageArea.innerHTML = msg;
  },

  // takes users guess and update the cell that was guessed with 'hit' img
  displayHit: function (location) {
    let cell = document.getElementById(location);
    cell.setAttribute("class", "hit");
  },

  // takes users guess and update the cell that was guessed with 'miss' img
  displayMiss: function (location) {
    let cell = document.getElementById(location);
    cell.setAttribute("class", "miss");
  },
};

// track amount of guesses and win condition
let winCondition = {
  guesses: 0,

  // processes the guess entered in the form
  processGuess: function (guess) {
    let location = parseGuess(guess);
    let accuracy = Math.round(
      ((gameData.numShips * 3) / this.guesses) * 100 - 1
    );
    if (location) {
      this.guesses++;
      let hit = gameData.fire(location); // runs guess through 'fire: function (guess)'
      if (hit && gameData.shipsSunk === gameData.numShips) {
        // displays winning message if all ships are sunk
        resultsDisplay.displayMessage(
          "You sank all my battleships, in " +
            this.guesses +
            " guesses with " +
            accuracy +
            "% accuracy! Good job silly goose :)"
        );
      }
    }
  },
};

// function to parse a guess from the user and check if its a valid guess
function parseGuess(guess) {
  let alphabet = ["A", "B", "C", "D", "E", "F", "G"]; // the only letters we will accept in the guess

  if (guess === null || guess.length !== 2) {
    // guess must be 2 characters
    alert(
      "Oops, please enter a valid letter and number combination you silly goose."
    );
  } else {
    let row = alphabet.indexOf(guess.charAt(0)); // converts letter portion of guess into a digit  (A-G to 0-6)
    let column = guess.charAt(1);

    if (isNaN(row) || isNaN(column)) {
      // both characters must be numbers at this point
      alert("Oops, that isn't on the board silly goose.");
    } else if (
      // making sure numbers are valid guesses on the board space
      row < 0 ||
      row >= gameData.boardSize ||
      column < 0 ||
      column >= gameData.boardSize
    ) {
      alert("Oops, that's off the board silly goose!");
    } else {
      return row + column; // returns a string of two numbers representing the user's guess
    }
  }
  return null; // guess is invalid and returns null
}

// event handlers
// handle fire button
function handleFireButton() {
  let guessInput = document.getElementById("guessInput"); // access DOM to retrieve guess input
  let guess = guessInput.value.toUpperCase(); // converts letter to uppercase and stores the guess

  winCondition.processGuess(guess); // runs through processGuess, parseGuess, and fire functions.. updates DOM... then checks win condition

  guessInput.value = ""; // removes old guess from form for convenience
}

// handle key press 
function handleKeyPress(e) {
  let fireButton = document.getElementById("fireButton");

  if (e.keyCode === 13) {
    fireButton.click(); // tells to browser to click fireButton for us if ENTER key (aka keyCode 13) is pressed
    return false;
  }
}

// TODO: initialize the game/assign event handlers and generate ship locations
window.onload = function () {
  // Fire! button onclick handler
  const fireButton = document.getElementById("fireButton");
  fireButton.onclick = handleFireButton;

  // handle "return" key press from guess input field
  const guessInput = document.getElementById("guessInput");
  guessInput.onkeydown = handleKeyPress;

  // TODO: generate ship locations
};
