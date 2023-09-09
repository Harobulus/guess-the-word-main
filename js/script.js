
// 1. The unordered list where the player’s guessed letters will appear.
const guessedLettersElements = document.querySelector(".guessed-letters");
// 2. The button with the text “Guess!” in it.
const guessButton = document.querySelector(".guess");
// 3. The text input where the player will guess a letter.
const textInput = document.querySelector(".letter");
// 4. The empty paragraph where the word in progress will appear.
const wordInProgress = document.querySelector(".word-in-progress");
// 5. The paragraph where the remaining guesses will display.
const remainingGuessesElement = document.querySelector(".remaining");
// 6. The span inside the paragraph where the remaining guesses will display.
const  remainingGuessesSpan = document.querySelector(".remaining span");
// 7. The empty paragraph where messages will appear when the player guesses a letter.
const message = document.querySelector(".message");
// 8. The hidden button that will appear prompting the player to play again.
const playAgainButton = document.querySelector(".play-again");
console.log(playAgainButton);

let word = "magnolia";

// Create a global variable with an empty array .This array will contain all the the letters the player guesses
let guessedLetters = [];

// Create a global variable called remaininGuesses and set it to a value of 8.
let remainingGuesses = 8;

// Add an async function
const getWord = async function () {
    const connectData = await fetch("https://gist.githubusercontent.com/skillcrush-curriculum/7061f1d4d3d5bfe47efbfbcfe42bf57e/raw/5ffc447694486e7dea686f34a6c085ae371b43fe/words.txt");
    const words = await connectData.text();
    const wordArray = words.split("\n");
    const randomIndex = Math.floor(Math.random() * wordArray.length);
    word = wordArray[randomIndex].trim();
    updateWordInProgress(word);
    };

//Play the game 
getWord();


// Display our symbols as placeholders for the chosen word's letters
const dot = "●";
const updateWordInProgress = function (word) {
    wordInProgress.innerText = `${dot.repeat(word.length)}`;
};


//Add an event listener for when a player clicks the guess button. Add a parameter for the event: e.
guessButton.addEventListener("click", function (e) {
    // To prevent default behavior of reloading.
    e.preventDefault();
    //Empty message paragraph
    message.innerText = "";
    // Create and name a variable to capture the value of input
    const valueOfInput = textInput.value;
    console.log(valueOfInput);

    // Empty the value of input
    // textInput.value = "";
   
    // Call the funtion used to check input and pass it the input value as an argument. Then save the result to a variable
    const validatedInput = validatePlayerInput(valueOfInput);
    // console.log(validatedInput);

    if (validatedInput) {
        makeGuess(valueOfInput);
    }
    textInput.value = "";
});//End of event listener

// Create a function to check player's input
const validatePlayerInput = function (input) {
    // Create a variable for accepted letter sequence using regular expression
    const acceptedLetter = /[a-zA-Z]/;

    // Use a conditional block to check for different scenarios
    if (input.length === 0) {//Check of the input is empty
      message.innerText = "Input cannot be empty, please enter a letter!";
    }else if (input.length > 1) {//check if the player has entered more than one letter
        message.innerText = "Please enter only 1 letter at a time!";
    }else if(input.match(acceptedLetter)) {//Check if the entered letter matches the regular expression
        console.log(input);
        message.innerText = "";
        return input;
    }else {
        message.innerText = "Digits are not allowed. Please enter a letter!";
    }
};

// Create a function to capture input
const makeGuess = function (valueOfInput) {
    // Convert all letters to uppercase because Javascript is case sensitive and sees uppercase and lowercase as different characters
    valueOfInput = valueOfInput.toUpperCase();

   if (guessedLetters.includes(valueOfInput)) {//Check of the array contains the guessed letter
    message.innerText = "You have already guessed that letter. Please try another one!";
   } else {
    
    guessedLetters.push(valueOfInput);//If they haven’t guessed that letter before, add the letter to the guessedLetters array.
    console.log(guessedLetters);
    countRemainingGuesses(valueOfInput);
    // Call displayGuessedLetters function so that the letter displays when it hasn't been guessed before.
    displayGuessedLetters();

    replaceCircles(guessedLetters);
    
}

};

// Create a function to update the page with letters the player guesses
const displayGuessedLetters = function () {
    guessedLettersElements.innerHTML = "";
    for (i = 0; i < guessedLetters.length; i++) {
        const li = document.createElement("li");
        li.innerText = guessedLetters[i];
        guessedLettersElements.append(li);
    }
};

// Create and name a function to update the word in progress that accepts the guessedLetters array as a parameter.
// The function will replace the circle symbols with the correct letters guessed.
const replaceCircles = function (guessedLetters) {
    const wordUpper = word.toUpperCase();
    const wordArray = wordUpper.split("");
    console.log(wordArray);
    const updatedWord = [];
    for (const letter of wordArray) {
        if (guessedLetters.includes(letter)) {
            updatedWord.push(letter.toUpperCase());
        } else {
            updatedWord.push("●");
        }
    };
    wordInProgress.innerText = updatedWord.join("");
    checkIfPlayerWon();
    // startOver();

};

// Create a function to count guesses remaining
const countRemainingGuesses = function (guess) {
    const upperWord = word.toUpperCase();
    if (!upperWord.includes(guess)) {
        message.innerText =`Try again! The word does not have the letter ${guess}`;
        remainingGuesses -= 1;
    } else {
        message.innerText = `Good guess! The word has the letter ${guess}.`;
    }
    
    if (remainingGuesses === 0) {
        message.innerText = `The game is over. The word is ${word}`;
        startOver();
    } else if (remainingGuesses === 1) {
        remainingGuessesSpan.innerText = `${remainingGuesses} guess`;
    } else {
        remainingGuessesSpan.innerText = `${remainingGuesses} guesses`;
        
    }
};

// Create and name a function to check if the player successfully guessed the word and won the game.
const checkIfPlayerWon = function () {
    if (wordInProgress.innerText === word.toUpperCase()) {
        message.classList.add("win");
        message.innerHTML = `<p class="highlight">You guessed the correct word! Congrats!</p>`;
    startOver();
    }

};

// Create a Function to Hide and Show Elements
const startOver = function () {
guessButton.classList.add("hide");
remainingGuessesElement.classList.add("hide");
guessedLettersElements.classList.add("hide");
playAgainButton.classList.remove("hide");
};

playAgainButton.addEventListener("click", function () {
    message.classList.remove("win");
    message.innerText = "";
    guessedLettersElements.innerHTML = "";
    remainingGuesses = 8;
    guessedLetters = [];
    remainingGuessesSpan.innerText = `${remainingGuesses}`;
    guessButton.classList.remove("hide");
    remainingGuessesElement.classList.remove("hide");
    guessedLettersElements.classList.remove("hide");
    playAgainButton.classList.add("hide");
    getWord();
}

);

