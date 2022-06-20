export function initBoard(numGuesses, level, hidden = false) {
    let board;
    if (level === 1) {
        board = document.getElementById("game-board-lvl-1");
    } else if (level === 2) {
        board = document.getElementById("game-board-lvl-2");
    } else {
        board = document.getElementById("game-board-lvl-3");
    }

    let numBoards = 2 ** (level - 1);
    while(numBoards > 0) {
        for (let i = 0; i < numGuesses; i++) {
            let row = document.createElement("div");
            row.className = "letter-row";
            
            for (let j = 0; j < 5; j++) {
                let box = document.createElement("div");
                if (hidden) {
                    box.className = "hidden-letter-box";
                } else {
                    box.className = "letter-box";
                }
                row.appendChild(box);
            }
            board.appendChild(row);
        }
        numBoards -= 1;
    }
}