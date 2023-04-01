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
    const td = document.getElementById(guess);
    for (let i = 0; i < this.numShips; i++) {
      // numShips is 3 as of now
      // 'this' refers to gameData here
      let ship = this.ships[i]; // aka gameData.ships[0,1,2]
      let index = ship.locations.indexOf(guess); // assigns users guess to index if its found, -1 if not found

      if (ship.hits[index] === "hit" || td.classList.contains("miss")) {
        // checks matching index in hits array for "hit"
        resultsDisplay.displayMessage(
          "Oops, you already guessed that location silly goose!"
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

  // generate ship locations
  generateShipLocations: function () {
    let locations; // empty array to hold current iterated ship location
    for (let i = 0; i < this.numShips; i++) {
      // generate ships = numShips
      do {
        locations = this.generateShip(); // stores an array with 3 values to represent a ship and its coordinates
      } while (this.collision(locations)); // checks if ship is overlapping with a previously created ship... if true (there IS a collision) run generateShip again
      this.ships[i].locations = locations; // once ship array is created and is verified to not be overlapping with another ship we save the location in gameData.ships and do it again until it creates ships = numShips
    }
    console.log("Ships array: ");
    console.log(this.ships);
  },

  // function to create an array of the current iterated ship
  generateShip: function () {
    let direction = Math.floor(Math.random() * 2); // coin flip direction
    let row, col;

    if (direction === 1) {
      // horizontal
      row = Math.floor(Math.random() * this.boardSize); // gives random value 0-6
      col = Math.floor(Math.random() * (this.boardSize - this.shipLength + 1)); // leaves room on right side of the board for remaining 2 spaces of ship
    } else {
      // vertical
      row = Math.floor(Math.random() * (this.boardSize - this.shipLength + 1)); // leaves room on bottom side of the board for remaining 2 spaces of ship
      col = Math.floor(Math.random() * this.boardSize); // gives random value 0-6
    }

    let newShipLocations = [];
    for (let i = 0; i < this.shipLength; i++) {
      if (direction === 1) {
        newShipLocations.push(row + "" + (col + i)); // adds 3 coords to newShipLocations array for a horizontal ship e.g. ['01', '02', '03']
      } else {
        newShipLocations.push(row + i + "" + col); // adds 3 coords to newShipLocations array for a vertical ship e.g. ['11', '21', '31']
      }
    }
    return newShipLocations; // hands the array to whatever calls it (aka generateShipLocations)
  },

  collision: function (locations) {
    // returns true
    for (let i = 0; i < this.numShips; i++) {
      let ship = this.ships[i];
      for (let j = 0; j < locations.length; j++) {
        if (ship.locations.indexOf(locations[j]) >= 0) {
          return true;
        }
      }
    }
    return false;
  },
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

// track amount of guesses, fires off the users guess, and checks win condition
let winCondition = {
  guesses: 0,

  // processes the guess entered in the form (or clicked)
  processGuess: function (guess) {
    // let location = parseFormGuess(guess); DISCONTINUED
    let td = document.getElementById(guess);
    let accuracy = Math.round(
      ((gameData.numShips * gameData.shipLength) / (this.guesses + 1)) * 100
    );
    if (
      guess &&
      !td.classList.contains("miss") &&
      !td.classList.contains("hit")
    ) {
      this.guesses++;
      let hit = gameData.fire(guess); // runs guess through 'fire: function (guess)'
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
    } else {
      resultsDisplay.displayMessage(
        "Oops, you already guessed that location silly goose!"
      );
    }
  },
};

// function to parse a guess from the user and check if the typed entry is a valid guess DISCONTINUED
function parseFormGuess(guess) {
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

// resets the game
function resetGame() {
  const tds = document.querySelectorAll("td");
  tds.forEach((td) => td.classList.remove(...td.classList));
  winCondition.guesses = 0;
  gameData.shipsSunk = 0;
  gameData.ships = [
    { locations: [0, 0, 0], hits: ["", "", ""] },
    { locations: [0, 0, 0], hits: ["", "", ""] },
    { locations: [0, 0, 0], hits: ["", "", ""] },
  ];
  messageArea.innerHTML = "Lets go again. Hit all the ships to win!";
  gameData.generateShipLocations();
}

// event handlers
// handle fire button DISCONTINUED
function handleFireButton() {
  let guessInput = document.getElementById("guessInput"); // access DOM to retrieve guess input
  let guess = guessInput.value.toUpperCase(); // converts letter to uppercase and stores the guess

  winCondition.processGuess(guess); // runs through processGuess, parseFormGuess, and fire functions.. updates DOM... then checks win condition

  guessInput.value = ""; // removes old guess from form for convenience
}

// handle key press DISCONTINUED
function handleKeyPress(e) {
  let fireButton = document.getElementById("fireButton");

  if (e.keyCode === 13) {
    fireButton.click(); // tells to browser to click fireButton for us if ENTER key (aka keyCode 13) is pressed
    return false;
  }
}

// handle cell click
function handleCellClick(e) {
  if (gameData.numShips !== gameData.shipsSunk) {
    let location = e.target.id;
    winCondition.processGuess(location);
  }
}

// initialize the game/assign event handlers and generate ship locations
window.onload = function () {
  // Fire! button onclick handler
  // const fireButton = document.getElementById("fireButton");
  // fireButton.onclick = handleFireButton; DISCONTINUED

  // handle "return" key press from guess input field
  // const guessInput = document.getElementById("guessInput");
  // guessInput.onkeydown = handleKeyPress; DISCONTINUED

  // adds click event listen to each cell
  let cells = document.querySelectorAll("td");
  for (let i = 0; i < cells.length; i++) {
    cells[i].addEventListener("click", handleCellClick);
  }

  // place the ships on the game board
  gameData.generateShipLocations();
};
