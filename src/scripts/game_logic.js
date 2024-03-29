import notie from 'notie';
import { getUniqueIndices } from './util';
import { initBoard } from './board';

export function insertLetter(gameVars, letter) {
    if (gameVars.nextLetterIdx === 5) {
        return;
    }
    letter = letter.toLowerCase();

    let board = document.getElementById(`game-board-lvl-${gameVars.currentLevel}`);
    let grids = board.children;
    for (let i = 0; i < grids.length; i++) {
        let rows = grids[i].children;
        let row = rows[rows.length - gameVars.guessesRemaining];
        // do not insert letter if the row has been marked with skip-input
        if (row.className === "letter-row skip-input") {
            continue;
        }
        let box = row.children[gameVars.nextLetterIdx];
        box.textContent = letter;
        box.classList.add("filled-box");
    }
    gameVars.currentGuess.push(letter);
    gameVars.nextLetterIdx += 1;
}

export function deleteLetter(gameVars) {
    let board = document.getElementById(`game-board-lvl-${gameVars.currentLevel}`);
    let grids = board.children;
    for (let i = 0; i < grids.length; i++) {
        let rows = grids[i].children;
        let row = rows[rows.length - gameVars.guessesRemaining];
        let box = row.children[gameVars.nextLetterIdx - 1];
        box.textContent = "";
        box.classList.remove("filled-box");
    }
    gameVars.currentGuess.pop();
    gameVars.nextLetterIdx -= 1;
}

export function checkGuess(gameVars) {
    let guessString = '';
    
    for (let i = 0; i < gameVars.currentGuess.length; i++) {
        guessString += gameVars.currentGuess[i];
    }

    if (guessString.length !== 5) {
        setTimeout(() => {
            notie.alert({
                type: 3,
                text: "Word is too short!",
                time: 2
            });
        }, 0);
        return;
    }

    if (!gameVars.guessableWords.includes(guessString)) {
        setTimeout(() => {
            notie.alert({
                type: 3,
                text: "Not a valid word!",
                time: 2
            });
        }, 0);
        return;
    }

    let board = document.getElementById(`game-board-lvl-${gameVars.currentLevel}`);
    let grids = board.children;
    
    let winners;
    let keyboardColors;
    if (gameVars.currentLevel === 1) {
        winners = [...gameVars.secretWordsLvl1];
        keyboardColors = [['gray'], ['gray'], ['gray'], ['gray'], ['gray']];
    } else if (gameVars.currentLevel === 2) {
        winners = [...gameVars.secretWordsLvl2];
        keyboardColors = [['gray', 'gray'], 
            ['gray', 'gray'], 
            ['gray', 'gray'], 
            ['gray', 'gray'], 
            ['gray', 'gray']];
    } else {
        winners = [...gameVars.secretWordsLvl3];
        keyboardColors = [['gray', 'gray', 'gray', 'gray'], 
            ['gray', 'gray', 'gray', 'gray'], 
            ['gray', 'gray', 'gray', 'gray'], 
            ['gray', 'gray', 'gray', 'gray'], 
            ['gray', 'gray', 'gray', 'gray']];
    }

    for (let i = 0; i < grids.length; i++) {
        let rows = grids[i].children;
        let row = rows[rows.length - gameVars.guessesRemaining];
        // skip coloring boxes and checking guess if row is marked with skip-input
        if (row.className === "letter-row skip-input") {
            continue;
        }
        let guessColors = ['gray', 'gray', 'gray', 'gray', 'gray'];
        let winner = winners[i];
        
        // loop through and change any correctly placed letters to green
        // remove the letter from the word so it is not considered again
        for (let j = 0; j < 5; j++) {
            let letter = gameVars.currentGuess[j];
            if (letter === winner[j]) {
                guessColors[j] = 'green';
                winner = winner.replace(letter, " ");
                keyboardColors[j][i] = 'green';
            }
        }

        // loop again and change any remaining letters in the word to yellow
        // remove the letter from the word
        for (let j = 0; j < 5; j++) {
            let letter = gameVars.currentGuess[j];
            if (guessColors[j] !== 'green' && winner.includes(letter)) {
                guessColors[j] = 'yellow';
                winner = winner.replace(letter, " ");
                keyboardColors[j][i] = 'yellow';
            }
        }

        for (let j = 0; j < 5; j++) {
            let delay = 250 * j;
            let box = row.children[j];
            setTimeout( () => {
                box.style.backgroundColor = guessColors[j];
            }, delay);
        }

        if (guessString === winners[i] && gameVars.erasableWinners.includes(guessString)) {
            stopInputOnGrid(grids[i]);
            // prevent the same word from being guessed again
            gameVars.erasableWinners.forEach((word, i) => {
                if (word === guessString) {
                    gameVars.erasableWinners[i] = "#";
                }
            })
            gameVars.correctCount += 1;
        }

        if (gameVars.correctCount === 2 ** (gameVars.currentLevel - 1)) {
            if (gameVars.currentLevel === 3) {
                gameVars.gameOver = true;
                setTimeout(() => {
                    notie.alert({
                        type: 1,
                        text: "You beat the game! Congratulations!",
                        time: 4
                    });
                }, 0);
                setTimeout(() => {
                    notie.confirm({
                        text: "Would you like to play again?",
                        submitText: "Let's go!",
                        cancelText: "No thanks.",
                        submitCallback: () => {
                            resetGame(gameVars);
                        }
                    })
                }, 4250)
            } else {
                setTimeout(() => {
                    notie.alert({
                        type: 1,
                        text: "Well done! You're moving on to the next level!",
                        time: 3
                    });
                }, 0);
            }
            setTimeout( () => {
                switchGameBoards(gameVars);
                if (!gameVars.gameOver) {
                    resetKeyboard();
                }
            }, 3000);
        }
    }
    for (let j = 0; j < 5; j++) {
        let letter = gameVars.currentGuess[j]
        let delay = 250 * j;
        setTimeout( () => {
            shadeKeyboard(letter, keyboardColors[j], gameVars.currentLevel);
        }, delay);
    }

    gameVars.guessesRemaining -= 1;
    gameVars.currentGuess = [];
    gameVars.nextLetterIdx = 0;

    if (gameVars.correctCount === 2 ** (gameVars.currentLevel - 1)) {
        return;
    }

    let gameOverMessage = "";
    if (gameVars.currentLevel === 1) {
        gameOverMessage = `The secret word was: ${gameVars.secretWordsLvl1[0]}`;
    } else if (gameVars.currentLevel === 2) {
        let winnersSpaced = "";
        gameVars.secretWordsLvl2.forEach(word => {
            winnersSpaced = winnersSpaced + word + ", ";
        })
        winnersSpaced = winnersSpaced.slice(0, -2);
        gameOverMessage = `The secret words were: ${winnersSpaced}`
    } else {
        let winnersSpaced = "";
        gameVars.secretWordsLvl3.forEach(word => {
            winnersSpaced = winnersSpaced + word + ", ";
        })
        winnersSpaced = winnersSpaced.slice(0, -2);
        gameOverMessage = `The secret words were: ${winnersSpaced}`
    }
    if (gameVars.guessesRemaining === 0) {
        gameVars.gameOver = true;
        setTimeout(() => {
            notie.alert({
                type: 3,
                text: "Out of guesses, game over. " + gameOverMessage,
                time: 4
            });
        }, 0);
        setTimeout(() => {
            notie.confirm({
                text: "Would you like to play again?",
                submitText: "Let's go!",
                cancelText: "No thanks.",
                submitCallback: () => {
                    resetGame(gameVars);
                }
            })
        }, 4250)
    }
}
    

function shadeKeyboard(letter, keyColors, currentLvl) {
    let keyboardButtons = document.getElementsByClassName("keyboard-button");
    let cssValuePrefix = "conic-gradient(";
    let numGrids = keyColors.length;
    let sections = [];
    let newColors = [];
    let degrees = 0;
    let increment = 360 / numGrids;

    for (let i = 0; i < keyboardButtons.length; i++) {
        if (keyboardButtons[i].textContent === letter) {
            let oldStyle = keyboardButtons[i].style.background.split(", ");
            let styleColors = [];

            if (oldStyle[0]) {
                for (let j = 0; j < keyColors.length; j++) {
                    if (oldStyle[j * 2].includes("green")) styleColors.push("green");
                    if (oldStyle[j * 2].includes("yellow")) styleColors.push("yellow");
                    if (oldStyle[j * 2].includes("gray")) styleColors.push("gray");
                }
            }

            // styleColors needs to be re-arranged because it is in
            // order of how the color was applied to the conic-gradient,
            // not in order of the boards
            if (currentLvl === 2) {
                styleColors = styleColors.reverse();
            } else if (currentLvl === 3) {
                let temp = styleColors.pop();
                styleColors.unshift(temp);
                [styleColors[2], styleColors[3]] = [styleColors[3], styleColors[2]];
            }

            for (let j = 0; j < numGrids; j++){
                if (styleColors[0]) {
                    if (styleColors[j] === "green" || keyColors[j] === "green") {
                        
                        newColors.push("green");
                    }
                    if (styleColors[j] === "yellow" && keyColors[j] !== "green") {
                        
                        newColors.push("yellow");
                    }
                    if (styleColors[j] === "gray") {
                        
                        newColors.push(keyColors[j]);
                    }
                } else {
                    newColors.push(keyColors[j]);
                }
            }
            
            // now we arrange colors in order of how they need to be applied
            // to the conic-gradient styling
            if (currentLvl === 2) {
                newColors = newColors.reverse();
            } else if (currentLvl === 3) {
                // current order: 1234 desired order: 2431
                let temp = newColors.shift();
                newColors.push(temp);
                [newColors[1], newColors[2]] = [newColors[2], newColors[1]];
            }
            
            for (let j = 0; j < numGrids; j++) {
                if (newColors[j] === "green") {
                    sections.push(`green ${degrees}deg ${degrees + increment}deg`);
                }
                if (newColors[j] === "yellow") {
                    sections.push(`yellow ${degrees}deg ${degrees + increment}deg`);
                }
                if (newColors[j] === "gray") {
                    sections.push(`gray ${degrees}deg ${degrees + increment}deg`);
                }
                degrees += increment;
                if (j === numGrids - 1) {
                    keyboardButtons[i].style.background = cssValuePrefix + sections.join(", ") + ")";
                }
            }
        }
    }

}


function resetKeyboard() {
    let keyboardButtons = document.getElementsByClassName("keyboard-button");
    for (let i = 0; i < keyboardButtons.length; i++) {
        keyboardButtons[i].removeAttribute("style");
    }
}

function switchGameBoards(gameVars) {
    let boardName = "game-board-lvl-2";
    let oldBoardName = "game-board-lvl-1";
    let oldNumGuesses = gameVars.lvl1Guesses;
    gameVars.currentLevel += 1;
    
    if (gameVars.currentLevel === 2) {
        gameVars.guessesRemaining = gameVars.lvl2Guesses;
    } else if (gameVars.currentLevel === 3) {
        gameVars.guessesRemaining = gameVars.lvl3Guesses;
        oldBoardName = boardName;
        oldNumGuesses = gameVars.lvl2Guesses;
        boardName = "game-board-lvl-3";
    }
    
    // hide the old board
    let oldBoard = document.getElementById(oldBoardName);
    for (let i = 0; i < oldNumGuesses; i++) {
        let rows = oldBoard.children;
        for (let j = 0; j < rows.length; j++) {
            let boxes = rows[j].children;
            for (let k = 0; k < boxes.length; k++) {

                boxes[k].classList.remove("letter-box");
                boxes[k].classList.add("hidden-letter-box");
                boxes[k].classList.remove("filled-box");
                boxes[k].textContent = "";
            }
        }
    }

    // show the new board
    let board = document.getElementById(boardName);
    let grids = board.children;
    for (let n = 0; n < grids.length; n++) {
        let rows = grids[n].children;
        for (let i = 0; i < gameVars.guessesRemaining; i++) {
            for (let j = 0; j < rows.length; j++) {
                let boxes = rows[j].children;
                for (let k = 0; k < boxes.length; k++) {
                    boxes[k].classList.remove("hidden-letter-box");
                    boxes[k].classList.add("letter-box");
                }
            }
        }
    }

    // reset game variables
    gameVars.nextLetterIdx = 0;
    gameVars.currentGuess = [];
    gameVars.correctCount = 0;
}

function stopInputOnGrid(grid) {
    let rows = grid.children;
    let rowsArr = Array.from(rows);
    rowsArr.forEach(row => {
        let box = row.children[0];
        if (!box.innerHTML) {
            row.className = "letter-row skip-input";
        }
    })

}

function resetGame(gameVars) {
    const secretWords = getUniqueIndices(7, gameVars.winningWords.length).map (idx => {
        return gameVars.winningWords[idx];
    })
    const lvl1Guesses = 6;
    const lvl2Guesses = 7;
    const lvl3Guesses = 9;

    // reset gameVars
    gameVars.secretWordsLvl1 = secretWords.slice(0, 1);
    gameVars.secretWordsLvl2 = secretWords.slice(1, 3);
    gameVars.secretWordsLvl3 = secretWords.slice(3);
    gameVars.erasableWinners = [...secretWords];
    gameVars.guessesRemaining = lvl1Guesses;
    gameVars.currentGuess = [];
    gameVars.nextLetterIdx = 0;
    gameVars.currentLevel = 1;
    gameVars.correctCount = 0;
    gameVars.gameOver = false;

    // reset game boards
    initBoard(lvl1Guesses, 1);
    initBoard(lvl2Guesses, 2, true);
    initBoard(lvl3Guesses, 3, true);

    // reset keyboard
    resetKeyboard();
}