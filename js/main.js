// 1. Define required constants:
/*----- constants -----*/
const CATEGORIES = ["planets", "stars"];
const MAX_GUESSES = 6;
const WORDS = {
  planets: [
    "mercury",
    "venus",
    "earth",
    "mars",
    "jupiter",
    "saturn",
    "uranus",
    "neptune",
  ],

  stars: [
    "sirius",
    "canopus",
    "arcturus",
    "vega",
    "rigel",
    "procyon",
    "mimosa",
    "spica",
    "pollux",
  ],
};
const ALPHABET = "abcdefghijklmnopqrstuvwxyz";

/*----- state variables -----*/
// 2. Define required variables used to track the state of the game:

let gameBoard = [];
let chosenCategory;
let hiddenWord = "";
let currentLetter;
let correctGuesses = new Set();
let incorrectGuesses = 0;
let gameEnd = false;

/*----- cached elements  -----*/
// 3. Cache DOM elements:

const gameContainer = document.getElementById("game-container");
const categorySelect = document.getElementById("category-select");
const wordDisplay = document.getElementById("word-display");
const keyboard = document.getElementById("keyboard");
const letterBtn = document.querySelectorAll(".alphabet");
const resultContainer = document.getElementById("result-container");
const replayBtn = document.getElementById("replay");
const spacemanParts = document.querySelectorAll("#spaceman > div");
const headEl = document.getElementById("head");
const bodyEL = document.getElementById("body");
const leftArmEl = document.getElementById("left-arm");
const rightArmEl = document.getElementById("right-arm");
const leftLegEl = document.getElementById("left-leg");
const rightLegEl = document.getElementById("right-leg");

/*----- event listeners -----*/

// add event listener to the letter button
letterBtn.forEach((letter) => {
  letter.addEventListener("click", handleLetterClick);
});

replayBtn.addEventListener("click", handleReplay);

/*----- functions -----*/
// 4. Upon loading the app should: 4.1) Initialize the state variables

function init() {
  chosenCategory = CATEGORIES[0];
  correctGuesses = new Set();
  incorrectGuesses = 0;

  // choose a random word from the chosen category
  let wordsInCategory = WORDS[chosenCategory];
  hiddenWord =
    wordsInCategory[Math.floor(Math.random() * wordsInCategory.length)];

  // update the display to show the lines for each letter
  wordDisplay.textContent = hiddenWord
    .split("")
    .map((letter) => (correctGuesses.has(letter) ? letter : "_"))
    .join(" ");

  resultContainer.classList.add("result-container-hide");
}

// 5. Handle a player clicking a button of a letter:

function handleLetterClick(e) {
  let letter = e.target.textContent;
  console.log(`handleLetterClick: ${letter}`);
  // checking if letter has not been guessed
  if (!correctGuesses.has(letter)) {
    correctGuesses.add(letter);
    let userInput = hiddenWord
      .split("")
      // .map((hiddenLetter) => (correctGuesses.has(letter) && hiddenLetter === letter ? letter : correctGuesses.has(hiddenLetter) ? hiddenLetter : "_"))
      .map((hiddenLetter) =>
        correctGuesses.has(hiddenLetter) ? hiddenLetter : "_"
      )
      .join(" ");
    // trying to update the word display to show the newly guessed letter
    wordDisplay.textContent = userInput;

    // checking if user/player won
    if (!userInput.includes("_")) {
      gameEnd = true;
      resultContainer.textContent = "You won!!, Great job!";
      if (resultContainer.classList) {
        resultContainer.classList.add("you-win");
      }
      // check if user/player lost
    } else if (!hiddenWord.includes(letter)) {
      incorrectGuesses++;
      drawSpaceman(incorrectGuesses);

      // check if the game is over
      if (incorrectGuesses === MAX_GUESSES) {
        gameEnd = true;
        resultContainer.textContent = "You Lose!, Try Again";
        if (resultContainer.classList) {
          resultContainer.classList.add("you-lose!");
        }
        wordDisplay.textContent = hiddenWord;
      }
    }
    console.log("userInput:", userInput);
  }
}

// 6. Handle a user/player clicking the replay button
function handleReplay() {
  gameEnd = false;
  init();
  resultContainer.classList.add("result-container-hide");
}

function drawSpaceman(incorrectGuesses) {
  for (let i = 0; i < incorrectGuesses && i < spacemanParts.length; i++) {
    spacemanParts[i].classList.add("show");
  }

  // if (incorrectGuesses > spacemanParts.length) {
  //   return;
  // }
  // for (let i = 0; i < incorrectGuesses; i++) {
  //   let parts = spacemanParts[i];
  //   if (parts) {
  //     parts.classList.add("show");
  //   }
  // }
  // if (incorrectGuesses >= spacemanParts.indexOf(headEl)) {
  //   headEl.classList.add("pop-out");
  // }
}

function checkForWinner() {
  console.log(wordDisplay);
  if (incorrectGuesses >= MAX_GUESSES) {
    replayBtn.style.display = "block";
    return false;
  } else if (!wordDisplay.includes("_")) {
    replayBtn.style.display = "block";
    return true;
  } else {
    return false;
  }
}
checkForWinner();

drawSpaceman();
init();
console.log();
