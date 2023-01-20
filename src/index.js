// entry file
import {readTextFiles} from "./scripts/word_lists.js";
import {getUniqueIndices} from "./scripts/util.js";
import {initBoard} from "./scripts/board.js";
import {insertLetter, deleteLetter, checkGuess} from "./scripts/game_logic.js";
import notie from 'notie';

readTextFiles("https://dkwal.github.io/Wordathon/src/textfiles/winning-words.txt", "https://dkwal.github.io/Wordathon/src/textfiles/guessable-words.txt").then((wordLists) => {
// readTextFiles("../src/textfiles/winning-words.txt", "../src/textfiles/guessable-words.txt").then((wordLists) => {
    
    // constant game variables
    // need to make into object so we can pass by reference to game_logic functions
    const WINNING_WORDS = wordLists[0].split("\n");
    const GUESSABLE_WORDS = wordLists[1].split("\n");
    const LVL_1_GUESSES = 6;
    const LVL_2_GUESSES = 7;
    const LVL_3_GUESSES = 9;
    const SECRET_WORDS = getUniqueIndices(7, WINNING_WORDS.length).map((idx) => {
        return WINNING_WORDS[idx];
    });
    const gameVars = {
        winningWords : WINNING_WORDS,
        guessableWords : WINNING_WORDS.concat(GUESSABLE_WORDS),
        secretWordsLvl1 : SECRET_WORDS.slice(0, 1),
        secretWordsLvl2 : SECRET_WORDS.slice(1, 3),
        secretWordsLvl3 : SECRET_WORDS.slice(3),
        erasableWinners : [...SECRET_WORDS],
        guessesRemaining : LVL_1_GUESSES,
        currentGuess : [],
        nextLetterIdx : 0,
        currentLevel : 1,
        correctCount : 0,
        lvl1Guesses: LVL_1_GUESSES,
        lvl2Guesses: LVL_2_GUESSES,
        lvl3Guesses: LVL_3_GUESSES,
        gameOver: false
    }
    
    // initialize level 1 board
    initBoard(LVL_1_GUESSES, 1);
    initBoard(LVL_2_GUESSES, 2, true);
    initBoard(LVL_3_GUESSES, 3, true);
    
    // display instructions
    setTimeout( () => {
        notie.force({
            type: 4,
            text: "Welcome to Wordathon! Your goal is to guess the secret 5-letter word. A green letter signals the letter is in the word and placed correctly. A yellow letter signals the letter is in the word but placed incorrectly. A gray letter is not present in the word. Type your word or click letters on the keyboard to input your guess.",
            buttonText: "Click here to get started!"
        })

    }, 0)

    // add event listener for user input
    document.addEventListener("keydown", (e) => {
        if (gameVars.guessesRemaining === 0) {
            return;
        }
        let pressedKey = String(e.key);
        if (pressedKey === "Backspace" && gameVars.nextLetterIdx !== 0) {
            deleteLetter(gameVars);
            return;
        }
    
        if (pressedKey === "Enter") {
            checkGuess(gameVars);
            return;
        }
    
        let found = pressedKey.match(/[a-z]/gi);
        if (!found || found.length > 1) {
            return;
        } else {
            insertLetter(gameVars, pressedKey);
        }
    });

    const keyboard = document.getElementById("keyboard-cont");
    keyboard.addEventListener("mousedown", e => {
        if (e.target.matches(".keyboard-button")) {
            if (gameVars.gameOver) {
                return;
            }
            let pressedKey = e.target.innerHTML;
            if (pressedKey === "Del" && gameVars.nextLetterIdx !== 0) {
                deleteLetter(gameVars);
                return;
            } else if (pressedKey === "Del") {
                return;
            } else if (pressedKey === "Enter") {
                checkGuess(gameVars);
                return;
            } else {
                insertLetter(gameVars, pressedKey);
                return;
            }
        }
    });

})