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
// const head = document.querySelector(".head");
const bodyParts = document.querySelectorAll(".body-part");
const resultCon = document.getElementById("result-container");
const gameMessage = document.getElementById("game-results");
const newGameBtn = document.getElementById("replay");

// Event listeners
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
console.log(hiddenWord);
console.log(WORDS);

function UpdateSpaceman() {
  console.log("incorrectGuesses:", incorrectGuesses);
  console.log("bodyParts:", bodyParts);
  for (let i = 0; i < bodyParts.length - 1; i++) {
    const bodyPart = bodyParts[i];
    if (bodyPart && i < incorrectGuesses) {
      bodyParts[i].style.display = "block";
    }
  }
}

function showBodyPart(bodyPart) {
  console.log("showBodyPart called with: ", bodyPart);

  if (bodyPart === "right-leg" && incorrectGuesses >= MAX_GUESSES) {
    document.getElementById(bodyPart).style.display = "block";
  } else {
    const index = incorrectGuesses - 1;
    if (bodyParts[index]) {
      bodyParts[index].style.display = "block";
    }
  }
}

function handleLetterClick(e) {
  let letter = e.target.textContent;
  console.log(`handleLetterClick: ${letter}`);
  if (!correctGuesses.has(letter)) {
    e.target.disabled = true;
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
      disableLetters();
      showPlayAgainBtn();
    } else if (!hiddenWord.includes(letter)) {
      ++incorrectGuesses;
      showBodyPart(`body-part-${incorrectGuesses}`);

      if (incorrectGuesses >= MAX_GUESSES) {
        gameEnds = true;
        resultCon.textContent = "You Lost Try Again";

        if (resultCon.classList) {
          resultCon.classList.add("you-lose");
        }
        wordDisplay.textContent = hiddenWord;
        disableLetters();
        showPlayAgainBtn();
      } else {
        UpdateSpaceman(incorrectGuesses);
      }
    }
    console.log("userInput:", userInput);
  }
}

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

function disableLetters() {
  lettersButton.forEach((button) => {
    if (!button.disabled) {
      button.disabled = true;
    }
  });
}

function showPlayAgainBtn() {
  newGameBtn.disabled = false;
  newGameBtn.style.display = "inline-block";
  console.log('workkkkkkkkk')
}

function handleReplay() {
  console.log("handleReplay called");
  showPlayAgainBtn()
  // gameEnds = false;
  // got location.reload() from stackOverflow https://stackoverflow.com/questions/65302198/how-to-reload-the-web-page-using-a-button-in-javascript
  location.reload();
  return false;
}
inIt();
