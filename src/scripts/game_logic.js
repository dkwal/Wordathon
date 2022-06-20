export function insertLetter(gameVars, letter) {
    if (gameVars.nextLetterIdx === 5) {
        return;
    }
    letter = letter.toLowerCase();

    let row = document.getElementsByClassName("letter-row")[6 - gameVars.guessesRemaining];
    let box = row.children[gameVars.nextLetterIdx];
    box.textContent = letter;
    box.classList.add("filled-box");
    gameVars.currentGuess.push(letter);
    gameVars.nextLetterIdx += 1;
}

export function deleteLetter(gameVars) {
    let row = document.getElementsByClassName("letter-row")[6 - gameVars.guessesRemaining];
    let box = row.children[gameVars.nextLetterIdx - 1];
    box.textContent = "";
    box.classList.remove("filled-box");
    gameVars.currentGuess.pop();
    gameVars.nextLetterIdx -= 1;
}

export function checkGuess(gameVars) {
    let row = document.getElementsByClassName("letter-row")[6 - gameVars.guessesRemaining];
    let guessString = '';
    let rightGuess = gameVars.secretWords[0].split("");
    
    for (let i = 0; i < gameVars.currentGuess.length; i++) {
        guessString += gameVars.currentGuess[i];
    }

    if (guessString.length !== 5) {
        alert("Word is too short!");
        return;
    }

    if (!gameVars.guessableWords.includes(guessString)) {
        alert("Not a valid word!");
        return;
    }

    for (let j = 0; j < 5; j++) {
        let letterColor = '';
        let box = row.children[j];
        let letter = gameVars.currentGuess[j];

        let letterPosition = gameVars.secretWords[0].indexOf(gameVars.currentGuess[j]);

        if (letterPosition === -1) {
            letterColor = 'gray';
        } else {
            if (gameVars.currentGuess[j] === gameVars.secretWords[0][j]) {
                letterColor = 'green';
            } else {
                letterColor = 'yellow';
            }
        }
        let delay = 250 * j;
        setTimeout( () => {
            box.style.backgroundColor = letterColor;
            shadeKeyboard(letter, letterColor);
        }, delay);
    }

    if (guessString === rightGuess.join("")) {
        alert("Correct! Passed level 1");
        // gameVars.guessesRemaining = 0;
        switchGameBoards(gameVars);
        return;
    } else {
        gameVars.guessesRemaining -= 1;
        gameVars.currentGuess = [];
        gameVars.nextLetterIdx = 0;

        if (gameVars.guessesRemaining === 0) {
            alert("Out of guesses, game over");
            alert(`The secret word was ${rightGuess.join("")}`);
        }
    }

    function shadeKeyboard(letter, color) {
        let keyboardButtons = document.getElementsByClassName("keyboard-button");
        for (let i = 0; i < keyboardButtons.length; i++) {
            if (keyboardButtons[i].textContent === letter) {
                let oldColor = keyboardButtons[i].style.backgroundColor;
                if (oldColor === 'green') return;
                if (oldColor === 'yellow' && color !== 'green') return;
                keyboardButtons[i].style.backgroundColor = color;
                break;
            }
        }
    }

    function switchGameBoards(gameVars) {
        console.log("switching boards");
        gameVars.currentLevel += 1;
        let boardName = "game-board-lvl-2";
        if (gameVars.currentLevel === 2) {
            gameVars.guessesRemaining = gameVars.lvl2Guesses;
        } else if (gameVars.currentLevel === 3) {
            gameVars.guessesRemaining = gameVars.lvl3Guesses;
            boardName = "game-board-lvl-3";
        }

        for (let i = 0; i < gameVars.guessesRemaining; i++) {
            let board = document.getElementById(boardName);
            let rows = board.children;
            for (let j = 0; j < rows.length; j++) {
                let boxes = rows[j].children;
                for (let k = 0; k < boxes.length; k++) {
                    boxes[k].classList.remove("hidden-letter-box");
                    boxes[k].classList.add("letter-box");
                }
            }
        }
    }

}
