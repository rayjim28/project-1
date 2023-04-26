const CATEGORY = "planets";
const WORDS = [
  "mercury",
  "venus",
  "earth",
  "mars",
  "jupiter",
  "saturn",
  "uranus",
  "neptune",
];
const MAX_GUESSES = 6;
const ALPHABETS = "abcdefghijklmnopqrstuvwxyz";

let gameBoard = [];
let chosenCategory;
let hiddenWord;
let correctGuesses;
let incorrectGuesses;
let gameResults;
let gameEnds;

const categorySelected = document.getElementById("category-select");
const wordDisplay = document.getElementById("word-display");
const keyboard = document.getElementById("keyboard");
const lettersButton = document.querySelectorAll(".alphabet");
const spacemanSvg = document.getElementById("spaceman-container");
const head = document.querySelector(".head");
const bodyParts = document.querySelectorAll(".body-part");
const resultCon = document.getElementById("result-container");
const gameMessage = document.getElementById("game-results");
const newGameBtn = document.getElementById("replay");


lettersButton.forEach((letter) => {
  letter.addEventListener("click", handleLetterClick);
});

newGameBtn.addEventListener("click", handleReplay);

inIt();

function inIt() {
  chosenCategory = CATEGORY[0];
  correctGuesses = new Set();
  incorrectGuesses = 0;

  hiddenWord = WORDS[Math.floor(Math.random() * WORDS.length)];

  wordDisplay.textContent = hiddenWord
    .split("")
    .map((letter) => (correctGuesses.has(letter) ? letter : "_"))
    .join(" ");
}
inIt()
console.log(hiddenWord);
console.log(WORDS);

function UpdateSpaceman() {
  const numIncorrectGuesses = incorrectGuesses - 1;
  for (let i = 0; i <= numIncorrectGuesses; i++) {
    const bodyPart = bodyParts[i];
    if (bodyPart) {
    bodyParts[i].classList.remove("hidden");
    }
  }
}

function showBodyPart(bodyPart) {
  const element = document.getElementById(bodyPart);
  if (element) {
  element.classList.remove("hidden");
  }
}


function handleLetterClick(e) {
  let letter = e.target.textContent;
  console.log(`handleLetterClick: ${letter}`);

  
  
  if (!correctGuesses.has(letter)) {
    e.target.disabled = "true";
    correctGuesses.add(letter);
    let userInput = hiddenWord
      .split("")
      .map((hiddenLetters) =>
        correctGuesses.has(hiddenLetters) ? hiddenLetters : "_"
      )
      .join(" ");
    console.log(userInput);

    wordDisplay.textContent = userInput;

    if (!userInput.includes("_")) {
      gameEnds = true;
      resultCon.textContent = "You Win!!, Great Job!";

      if (resultCon.classList) {
        resultCon.classList.add("you-win");
      }
    } else if (!hiddenWord.includes(letter)) {
      incorrectGuesses++;
      showBodyPart(`body-part-${incorrectGuesses}`);
      if (incorrectGuesses === 1) {
        showBodyPart('head');
      } else if (incorrectGuesses === 2) {
        showBodyPart('body');
      } else if (incorrectGuesses === 3) {
        showBodyPart('left-arm');
      } else if (incorrectGuesses === 4) {
        showBodyPart('right-arm');
      } else if (incorrectGuesses === 5) {
        showBodyPart('left-leg');
      } else if (incorrectGuesses === 6) {
        showBodyPart('right-leg');
      }
      if (incorrectGuesses === MAX_GUESSES) {
        gameEnds = true;
        newGameBtn.style.display = "block";
        resultCon.textContent = "You Lost Try Again";

        if (resultCon.classList) {
          resultCon.classList.add("you-lose");
        }
        wordDisplay.textContent = hiddenWord;
      } else {
        UpdateSpaceman(incorrectGuesses);
      }
    }
    console.log("userInput:", userInput);
  }
}


function checkForWinner() {
  console.log(wordDisplay);
  if (incorrectGuesses === MAX_GUESSES) {
   
    return false;
  } else if (!wordDisplay.includes("_")) {
    
    return true;
  } else {
    return false;
  }
}

function handleReplay() {
  gameEnds = false;
  inIt()
}

