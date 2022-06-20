// code snippet from https://www.freecodecamp.org/news/build-a-wordle-clone-in-javascript/

export function initBoard(numGuesses) {
    let board = document.getElementById("game-board");

    for (let i = 0; i < numGuesses; i++) {
        let row = document.createElement("div");
        row.className = "letter-row";
        
        for (let j = 0; j < 5; j++) {
            let box = document.createElement("div");
            box.className = "letter-box";
            row.appendChild(box);
        }
        board.appendChild(row);
    }
}