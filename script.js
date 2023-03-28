// store main game data/game state
let gameData = {
  boardSize: 7,
  numShips: 3,
  shipLength: 3,
  shipsSunk: 0,

  ships: [ // array thats storing the ship locations and if the player has hit those ship locations
    { locations: [0, 0, 0], hits: ["", "", ""] },
    { locations: [0, 0, 0], hits: ["", "", ""] },
    { locations: [0, 0, 0], hits: ["", "", ""] },
  ],
};

// display results of guess to the player (msg and miss/hit)

//track amount of guesses and win condition

// function to parse a guess from the user

// event handlers
// handle fire button
// handle key press

// initialize the game/assign event handlers and generate ship locations
