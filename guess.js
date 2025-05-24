let gameName = "Guess The Word";
document.title = gameName;
document.querySelector("h1").innerText = gameName;
document.querySelector(
  "footer"
).innerHTML = `${gameName} &copy; ${new Date().getFullYear()} by Omar Hassein`;

let numberOfTries = 6;
let numberOfLetters = 6;
let currentTry = 1;

let wordToGuess = "";
let words = [
  "animal",
  "banana",
  "bottle",
  "button",
  "candle",
  "circle",
  "coffee",
  "cookie",
  "cotton",
  "danger",
  "dollar",
  "dragon",
  "eagle",
  "energy",
  "family",
  "father",
  "flower",
  "forest",
  "friend",
  "garden",
  "guitar",
  "hammer",
  "hockey",
  "island",
  "jacket",
  "jungle",
  "kitten",
  "ladder",
  "letter",
  "market",
  "monkey",
  "mother",
  "napkin",
  "orange",
  "pencil",
  "pepper",
  "pickle",
  "planet",
  "pocket",
  "rabbit",
  "rocket",
  "salmon",
  "school",
  "silver",
  "simple",
  "soccer",
  "spider",
  "spring",
  "square",
  "street",
  "summer",
  "sunset",
  "tablet",
  "ticket",
  "tomato",
  "turtle",
  "vacuum",
  "valley",
  "violin",
  "window",
  "winter",
  "yellow",
  "bridge",
  "camera",
  "castle",
  "cheese",
  "circle",
  "cloudy",
  "doctor",
  "donkey",
  "engine",
  "farmer",
  "finger",
  "forest",
  "friend",
  "gallon",
  "garden",
  "goblet",
  "grapes",
  "hammer",
  "hunter",
  "jigsaw",
  "kitten",
  "laptop",
  "magnet",
  "marble",
  "mirror",
  "museum",
  "napkin",
  "needle",
  "office",
  "parrot",
  "pillow",
  "pirate",
  "planet",
  "puzzle",
  "rabbit",
  "rocket",
  "sailor",
];
wordToGuess = words[Math.floor(Math.random() * words.length)].toLowerCase();

let hintsNumber = 2;
document.querySelector(".hint span").innerHTML = `${hintsNumber}`;
document.querySelector(".hint").addEventListener("click", getHint);

function generateInput() {
  let inputContainer = document.querySelector(".inputs");

  for (let i = 1; i <= numberOfTries; i++) {
    let inputRow = document.createElement("div");
    inputRow.classList.add(`try-${i}`);
    inputRow.innerHTML = `<span>Try ${i}</span>`;

    if (i !== 1) inputRow.classList.add("disabled-input");

    for (let j = 1; j <= numberOfLetters; j++) {
      let input = document.createElement("input");
      input.type = "text";
      input.setAttribute("maxlength", "1");
      input.id = `row-${i}-letter-${j}`;
      inputRow.appendChild(input);
    }
    inputContainer.appendChild(inputRow);
  }
  document.getElementById("row-1-letter-1").focus();

  const disabledInput = document.querySelectorAll(".disabled-input input");
  disabledInput.forEach((e) => (e.disabled = true));

  const inputs = document.querySelectorAll("input");
  inputs.forEach((input, i) => {
    input.addEventListener("input", () => {
      if (inputs[i + 1]) inputs[i + 1].focus();
    });

    input.addEventListener("keydown", (event) => {
      const currentIndex = Array.from(inputs).indexOf(event.target);

      if (event.key === "ArrowRight") {
        if (currentIndex + 1 < inputs.length) inputs[currentIndex + 1].focus();
      }
      if (event.key === "ArrowLeft") {
        if (currentIndex - 1 >= 0) inputs[currentIndex - 1].focus();
      }
    });
  });
}
console.log(wordToGuess);
const checkButton = document.querySelector(".check");
checkButton.addEventListener("click", () => {
  let theGuess = true;
  let message = document.querySelector(".message");

  for (let i = 1; i <= numberOfLetters; i++) {
    let inputLetter = document.getElementById(`row-${currentTry}-letter-${i}`);
    const letter = inputLetter.value.toLowerCase();

    if (letter === wordToGuess[i - 1]) inputLetter.classList.add("correct");
    else if (wordToGuess.includes(letter) && letter !== "") {
      inputLetter.classList.add("not-in-place");
      theGuess = false;
    } else {
      inputLetter.classList.add("wrong");
      theGuess = false;
    }
  }

  if (theGuess) {
    message.innerHTML = `congratulations, you guessed the word <span>${wordToGuess}</span>`;

    document
      .querySelectorAll(".inputs > div")
      .forEach((e) => e.classList.add("disabled-input"));

    checkButton.classList.add("disabled-button");
    document.querySelector(".hint").classList.add("disabled-button");
  } else {
    document
      .querySelector(`.try-${currentTry}`)
      .classList.add("disabled-input");
    document
      .querySelectorAll(`.try-${currentTry} input`)
      .forEach((e) => (e.disabled = true));

    currentTry++;

    if (document.querySelector(`.try-${currentTry}`)) {
      document
        .querySelector(`.try-${currentTry}`)
        .classList.remove("disabled-input");

      document
        .querySelectorAll(`.try-${currentTry} input`)
        .forEach((e) => (e.disabled = false));

      document.querySelectorAll(`.try-${currentTry} input`)[0].focus();
    } else {
      message.innerHTML = `Game Over, the word was <span>${wordToGuess}</span>`;
      checkButton.classList.add("disabled-button");
      document.querySelector(".hint").classList.add("disabled-button");
    }
  }
});

function getHint() {
  if (hintsNumber > 0) {
    hintsNumber--;
    document.querySelector(".hint span").innerHTML = hintsNumber;
  }
  if (hintsNumber === 0) {
    document.querySelector(".hint").classList.add("disabled-button");
  }

  let validInputs = document.querySelectorAll("input:not([disabled])");
  let emptyValidInputs = Array.from(validInputs).filter(
    (input) => input.value === ""
  );

  if (emptyValidInputs.length > 0) {
    let randomIndex = Math.floor(Math.random() * emptyValidInputs.length);
    let randomInput = emptyValidInputs[randomIndex];
    let index = Array.from(validInputs).indexOf(randomInput);

    if (index !== -1) {
      randomInput.value = wordToGuess[index];
    }
  }
}

function backSpace(event) {
  if (event.key === "Backspace") {
    let inputs = document.querySelectorAll("input:not([disabled])");
    let currentIndex = Array.from(inputs).indexOf(document.activeElement);

    if (inputs[currentIndex].value === "") {
      if (currentIndex > 0) {
        inputs[currentIndex - 1].value = "";
        inputs[currentIndex - 1].focus();
      }
    } else {
      inputs[currentIndex].value = "";
    }
  }
}

document.addEventListener("keydown", backSpace);

window.onload = function () {
  generateInput();
};
