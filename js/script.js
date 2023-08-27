
// 1. The unordered list where the player’s guessed letters will appear.
const guessedLettersElements = document.querySelector(".guessed-letters");
// 2. The button with the text “Guess!” in it.
const guessButton = document.querySelector(".guess");
// 3. The text input where the player will guess a letter.
const textInput = document.querySelector(".letter");
// 4. The empty paragraph where the word in progress will appear.
const wordInProgress = document.querySelector(".word-in-progress");
// 5. The paragraph where the remaining guesses will display.
const remainingGuesses = document.querySelector(".remaining");
// 6. The span inside the paragraph where the remaining guesses will display.
const  remainingGuessesSpan = document.querySelector(".remaining span");
// 7. The empty paragraph where messages will appear when the player guesses a letter.
const message = document.querySelector(".message");
// 8. The hidden button that will appear prompting the player to play again.
const playAgainButton = document.querySelector(".play-again hide");

const word = "magnolia";
const guessedLetters = [];

// Display our symbols as placeholders for the chosen word's letters
const dot = "●";
const updateWordInProgress = function (word) {
    wordInProgress.innerText = `${dot.repeat(word.length)}`;
};

updateWordInProgress(word);
//Add an event listener for when a player clicks the guess button. Add a parameter for the event: e.
guessButton.addEventListener("click", function (e) {
    // console.log(e);

    // To prevent default behavior of reloading.
    e.preventDefault();

    // Create an name a variable to capture the value of input
    const valueOfInput = textInput.value;
    console.log(valueOfInput);

    // Empty the value of input
    textInput.value = "";
    
    const validatedInput = validatePlayerInput(valueOfInput);
    console.log(validatedInput);
    if (validatedInput) {
        makeGuess(validatedInput);
    }
    textInput.value = "";
});

// Create a function to check player's input
const validatePlayerInput = function (input) {
    // Create a variable for accepted letter sequence using regular expression
    const acceptedLetter = /[a-zA-Z]/;

    // Use a conditional block to check for different scenarios
    if (input === "") {//Check of the input is empty
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

const makeGuess = function (valueOfInput) {
    valueOfInput = valueOfInput.toUpperCase();
   if (guessedLetters.includes(valueOfInput)) {
    message.innerText = "You have already guessed that letter. Please try another one!";
   } else {
    guessedLetters.push(valueOfInput);
    console.log(guessedLetters);
}

};
