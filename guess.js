let languageButton = document.querySelector(".language");
let isEnglish =
  localStorage.getItem("isEnglish") === null
    ? true
    : localStorage.getItem("isEnglish") === "true";

function setLanguageUI() {
  if (isEnglish) {
    languageButton.innerHTML = "العربية";
    document.documentElement.lang = "en";
  } else {
    languageButton.innerHTML = "English";
    document.documentElement.lang = "ar";
  }
}

setLanguageUI();

languageButton.addEventListener("click", () => {
  isEnglish = !isEnglish;
  localStorage.setItem("isEnglish", isEnglish);
  setLanguageUI();
  window.location.reload();
});

if (isEnglish) {
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
          if (currentIndex + 1 < inputs.length)
            inputs[currentIndex + 1].focus();
        }
        if (event.key === "ArrowLeft") {
          if (currentIndex - 1 >= 0) inputs[currentIndex - 1].focus();
        }
      });
    });
  }
  console.log(wordToGuess);
  const checkButton = document.querySelector(".check");
  checkButton.addEventListener("click",check);
  document.addEventListener("keydown", (event) => {if (event.key === "Enter") check()});
    
    function check() {
    let theGuess = true;
    let message = document.querySelector(".message");

    for (let i = 1; i <= numberOfLetters; i++) {
      let inputLetter = document.getElementById(
        `row-${currentTry}-letter-${i}`
      );
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
  };

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
} else {
  let gameName = "تخمين الكلمة";
  document.title = gameName;
  document.querySelector("h1").innerText = gameName;
  document.querySelector(
    "footer"
  ).innerHTML = `${gameName} &copy; ${new Date().getFullYear()} بواسطة عمر حسين`;
  document.body.style.direction = "rtl";

  document.querySelector(".game-key h2").innerHTML = "الالوان الرئيسية";
  document.querySelector(".correct + div").innerHTML =
    "الحرف صحيح و في مكانه الصحيح";
  document.querySelector(".not-in-place + div").innerHTML =
    "الحرف صحيح و لكن في مكان آخر";
  document.querySelector(".wrong + div").innerHTML = "الحرف غير صحيح";
  document
    .querySelectorAll(".color")
    .forEach((e) => (e.style.marginLeft = "10px"));

  let numberOfTries = 5;
  let numberOfLetters = 5;
  let currentTry = 1;

  let wordToGuess = "";
  let words =[
    "كتابه", "مدرسة", "مطرقة", "سيارة", "لعبة", "صحيفة", "سكينة", "طاولة", "بطاقة", "نافذة",
    "شتاء", "شجرة", "مسرح", "كوكب", "صديق", "هدية", "طائر", "تمثل", "شاطئ", "فرصة",
    "لوحة", "حقيبة", "كرسي", "وظيفة", "ملابس", "نظارة", "شعلة", "هاتف", "فطور", "طريق",
    "كعبه", "عجلة", "مسمار", "كتابي", "وسادة", "شروق", "غروب", "رمال", "فندق", "نشيد",
    "نعمة", "غابة", "حذاء", "خيمة", "جدار", "سكين", "ضباب", "عنبر", "قمره", "سحاب"
]
let correctWords = words.filter( e => e.length === 5);
  wordToGuess = correctWords[Math.floor(Math.random() * correctWords.length)];

  let hintsNumber = 2;
  document.querySelector(".hint").innerHTML = "<span></span> تلميحات";
  document.querySelector(".hint span").innerHTML = `${hintsNumber}`;
  document.querySelector(".hint").addEventListener("click", getHint);

  let checkButton = document.querySelector(".check");
  checkButton.innerHTML = "تحقق";
  checkButton.addEventListener("click", check);
  document.addEventListener("keydown", (event) => {if (event.key === "Enter") check()});

  document.addEventListener("keydown", backSpace);

  console.log(wordToGuess);

  function check() {
    let theGuess = true;

    for (let i = 1; i <= numberOfLetters; i++) {
      let inputField = document.getElementById(`row-${currentTry}-letter-${i}`);
      let letter = inputField.value;

      if (letter === wordToGuess[i - 1]) inputField.classList.add("correct");
      else if (wordToGuess.includes(letter) && letter !== "") {
        inputField.classList.add("not-in-place");
        theGuess = false;
      } else {
        inputField.classList.add("wrong");
        theGuess = false;
      }
    }

    if (theGuess) {
      document.querySelector(
        ".message"
      ).innerHTML = `تهانينا لفد خمنت الكلمه <span>${wordToGuess}</span>`;
      checkButton.classList.add("disabled-button");
      document.querySelector(".hint").classList.add("disabled-button");
      document
        .querySelectorAll(".inputs > div")
        .forEach((e) => e.classList.add("disabled-input"));
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
        document.querySelector(`.try-${currentTry} input`).focus();
      } else {
        document.querySelector(
          ".message"
        ).innerHTML = `لقد خسرت الكلمة كانت <span>${wordToGuess}</span>`;
        checkButton.classList.add("disabled-button");
        document.querySelector(".hint").classList.add("disabled-button");
      }
    }
  }

  function generateInputs() {
    let inputContainer = document.querySelector(".inputs");

    for (let i = 1; i <= numberOfTries; i++) {
      let inputRow = document.createElement("div");
      inputRow.classList.add(`try-${i}`);
      inputRow.innerHTML = `<span>المحاولة رقم ${i}</span>`;

      for (let j = 1; j <= numberOfLetters; j++) {
        let input = document.createElement("input");
        input.type = "text";
        input.setAttribute("maxlength", "1");
        input.id = `row-${i}-letter-${j}`;
        inputRow.appendChild(input);
      }
      inputContainer.appendChild(inputRow);
      if (i !== 1) {
        inputRow.classList.add("disabled-input");
        document
          .querySelectorAll(`.disabled-input input`)
          .forEach((e) => (e.disabled = true));
      }
    }
    document.getElementById("row-1-letter-1").focus();

    const inputs = document.querySelectorAll("input");
    inputs.forEach((input, i) => {
      input.addEventListener("input", () => {
        if (inputs[i + 1]) inputs[i + 1].focus();
      });

      input.addEventListener("keydown", (e) => {
        const currentIndex = Array.from(inputs).indexOf(e.target);

        if (e.key === "ArrowRight" && currentIndex - 1 >= 0)
          inputs[currentIndex - 1].focus();
        if (e.key === "ArrowLeft" && currentIndex + 1 > length)
          inputs[currentIndex + 1].focus();
      });
    });
  }

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
      (e) => e.value === ""
    );

    if (emptyValidInputs.length > 0) {
      let randomIndex = Math.floor(Math.random() * emptyValidInputs.length);
      let randomInput = emptyValidInputs[randomIndex];
      let hintIndex = Array.from(validInputs).indexOf(randomInput);

      if (hintIndex !== -1) {
        randomInput.value = wordToGuess[hintIndex];
      }
    }
  }

  function backSpace(event) {
    if (event.key === "Backspace") {
      let inputs = document.querySelectorAll("input:not([disabled])");
      let currentIndex = Array.from(inputs).indexOf(document.activeElement);

      if (inputs[currentIndex].value === "" && currentIndex > 0) {
        inputs[currentIndex - 1].value = "";
        inputs[currentIndex - 1].focus();
      } else {
        inputs[currentIndex].value = "";
      }
    }
  }

  window.onload = function () {
    generateInputs();
  };
}

// let isEnglish = localStorage.getItem("isEnglish") === null ? true : localStorage.getItem("isEnglish") === "true";

// function setLanguageUI() {
//   if (isEnglish) {
//     languageButton.innerHTML = "العربية";
//     document.documentElement.lang = "en";
//   } else {
//     languageButton.innerHTML = "English";
//     document.documentElement.lang = "ar";
//   }
// }

// setLanguageUI();

// languageButton.addEventListener("click", () => {
//   isEnglish = !isEnglish;
//   localStorage.setItem("isEnglish", isEnglish);
//   setLanguageUI();
//   window.location.reload();
// });
