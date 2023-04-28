// Defined constants
const CATEGORY = "planets";
const WORDS = [
  "MERCURY",
  "VENUS",
  "EARTH",
  "MARS",
  "JUPITER",
  "SATURN",
  "URANUS",
  "NEPTUNE",
];
const MAX_GUESSES = 6;
const ALPHABETS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

// Defined variables
let hiddenWord;
let correctGuesses;
let incorrectGuesses;
let gameEnds;

// Defined DOM elements
const wordDisplay = document.getElementById("word-display");
const keyboard = document.getElementById("keyboard");
const lettersButton = document.querySelectorAll(".alphabet");
const spacemanSvg = document.getElementById("spaceman-container");
const bodyParts = document.querySelectorAll(".body-part");
const resultCon = document.getElementById("result-container");
const newGameBtn = document.getElementById("replay");

// Event listeners
lettersButton.forEach((letter) => {
  letter.addEventListener("click", handleLetterClick);
});

newGameBtn.addEventListener("click", handleReplay);

// Function to initialize the game
function inIt() {
  correctGuesses = new Set();
  incorrectGuesses = 0;

  hiddenWord = WORDS[Math.floor(Math.random() * WORDS.length)];

  // This changes the initial display of the hidden word to underscores
  wordDisplay.textContent = hiddenWord
    .split("")
    .map((letter) => (correctGuesses.has(letter) ? letter : "_"))
    .join(" ");
}

// This function updates the SVG of the spaceman as incorrect guesses accumulate
function UpdateSpaceman() {
  for (let i = 0; i < bodyParts.length - 1; i++) {
    const bodyPart = bodyParts[i];
    if (bodyPart && i < incorrectGuesses) {
      bodyParts[i].style.display = "block";
    }
  }
}

// This function shows the appropriate body part of the spaceman when an incorrect guess is made by user/player
function showBodyPart(bodyPart) {
  // if the body part is the right leg and the number of incorrect guesses made by user/player is greater
  if (bodyPart === "right-leg" && incorrectGuesses >= MAX_GUESSES) {
    document.getElementById(bodyPart).style.display = "block";
  } else {
    const index = incorrectGuesses - 1;
    if (bodyParts[index]) {
      bodyParts[index].style.display = "block";
    }
  }
}

// This function handles the click event when the user/player is playing the game 
function handleLetterClick(e) {
  // It takes the letter that was clicked and stores it in the variable letter
  let letter = e.target.textContent;
  if (!correctGuesses.has(letter)) {
    e.target.disabled = true;
    correctGuesses.add(letter);
    let userInput = hiddenWord
      .split("")
      .map((hiddenLetters) =>
        correctGuesses.has(hiddenLetters) ? hiddenLetters : "_"
      )
      .join(" ");

    wordDisplay.textContent = userInput;

    // Checks if user/player has won
    if (!userInput.includes("_")) {
      gameEnds = true;
      resultCon.textContent = "You Win!!, Great Job!";

      if (resultCon.classList) {
        resultCon.classList.add("you-win");
      }

      // Disable the letter buttons and show the play/reset button
      disableLetters();

      // If the user/player has not won, check if the user/player has made an incorrect guess
    } else if (!hiddenWord.includes(letter)) {
      ++incorrectGuesses;
      showBodyPart(`body-part-${incorrectGuesses}`);

      // Checks if user/player has exceeded the maximum number of incorrect guesses allowed.
      // If so, ends the game by displaying a message, and disabling the letters 
      if (incorrectGuesses >= MAX_GUESSES) {
        gameEnds = true;
        resultCon.textContent = "You Lose, Try Again";
        if (resultCon.classList) {
          resultCon.classList.add("you-lose");
        }
        wordDisplay.textContent = hiddenWord;
        disableLetters();
      } else {
        UpdateSpaceman(incorrectGuesses);
      }
    }
  }
}

// Checks wether the user/player has correctly guessed all the letters in the hidden word or if user/player has exceeded the maximum guesses
function checkForWinner() {
  console.log(wordDisplay);
  if (incorrectGuesses >= MAX_GUESSES) {
    return false;
  } else if (!wordDisplay.includes("_")) {
    return true;
  } else {
    return false;
  }
}

// This function disables all the buttons corresponding to the letters
function disableLetters() {
  lettersButton.forEach((button) => {
    if (!button.disabled) {
      button.disabled = true;
    }
  });
}

// This function reloads the game when the user/player clicks on the Play/Reset button
function handleReplay() {
  // got location.reload() from stackOverflow https://stackoverflow.com/questions/65302198/how-to-reload-the-web-page-using-a-button-in-javascript
  location.reload();
  return false;
}
inIt();
