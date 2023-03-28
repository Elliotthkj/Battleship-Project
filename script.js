// store main game data/game state
let gameData = {
  boardSize: 7,
  numShips: 3,
  shipLength: 3,
  shipsSunk: 0,

  ships: [
    // array thats storing the ship locations and if the player has hit those ship locations
    { locations: [0, 0, 0], hits: ["", "", ""] },
    { locations: [0, 0, 0], hits: ["", "", ""] },
    { locations: [0, 0, 0], hits: ["", "", ""] },
  ],
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
